const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend/components/articles/ArticlesClient.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Change signature
content = content.replace(
  /export default function ArticlesClient\(\{ initialArticles = \[\] \}: \{ initialArticles\?: any\[\] \}\) \{/g,
  'export default function ArticlesClient({ initialArticles = [], initialPagination }: { initialArticles?: any[], initialPagination?: any }) {'
);

// 2. Add infinite scroll states
content = content.replace(
  /const \[filtered, setFiltered\] = useState<any\[\]>\(initialArticles\);\s*const \[loading, setLoading\] = useState\(false\);/,
  `const [page, setPage] = useState(initialPagination?.page || 1);
  const [hasMore, setHasMore] = useState((initialPagination?.page || 1) < (initialPagination?.pages || 1));
  const [loading, setLoading] = useState(false);
  const observerTarget = React.useRef<HTMLDivElement>(null);`
);

// 3. Replace the useCallback applyFilters and useEffect with API call logic
const oldLogicRegex = /\/\/ Apply filters whenever state changes[\s\S]*?\}, \[applyFilters\]\);/m;

const newLogicCode = `  // Apply filters via API
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        let url = \`/api/articles?page=1&limit=12\`;
        if (activeCategory !== 'All Articles') url += \`&category=\${encodeURIComponent(activeCategory)}\`;
        if (search.trim()) url += \`&search=\${encodeURIComponent(search.trim())}\`;
        if (sortOrder !== 'Newest First') url += \`&sort=\${encodeURIComponent(sortOrder)}\`;

        const res = await fetch(getEndpoint(url));
        const data = await res.json();
        
        if (data.success) {
          let results = data.data;
          if (activeTab === 'Favorites') {
             results = results.filter((a: any) => savedArticles.includes(a._id));
          }
          setArticles(results);
          setPage(data.pagination.page);
          setHasMore(data.pagination.page < data.pagination.pages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchFiltered();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, search, sortOrder, activeTab, savedArticles]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url = \`/api/articles?page=\${page + 1}&limit=12\`;
      if (activeCategory !== 'All Articles') url += \`&category=\${encodeURIComponent(activeCategory)}\`;
      if (search.trim()) url += \`&search=\${encodeURIComponent(search.trim())}\`;
      if (sortOrder !== 'Newest First') url += \`&sort=\${encodeURIComponent(sortOrder)}\`;

      const res = await fetch(getEndpoint(url));
      const data = await res.json();
      
      if (data.success) {
        let results = data.data;
        if (activeTab === 'Favorites') {
           results = results.filter((a: any) => savedArticles.includes(a._id));
        }
        setArticles(prev => [...prev, ...results]);
        setPage(data.pagination.page);
        setHasMore(data.pagination.page < data.pagination.pages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore, loading, page, activeCategory, search, sortOrder, activeTab, savedArticles]);`;

content = content.replace(oldLogicRegex, newLogicCode);

// 4. Change filtered references to articles
content = content.replace(/filtered\.length/g, 'articles.length');
content = content.replace(/filtered\.map/g, 'articles.map');

// 5. Add Observer target at the end of the list
const endListRegex = /\{\/\* Right Sidebar \*\/\}/;
const newEndList = `  {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]"></div>
              </div>
            )}
            <div ref={observerTarget} className="h-10 mt-8" />
          </div>
          
          {/* Right Sidebar */}`;

content = content.replace(/<\/div>\s*\{\/\* Right Sidebar \*\/\}/m, newEndList);

fs.writeFileSync(file, content, 'utf8');
console.log('ArticlesClient patched!');
