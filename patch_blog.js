const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend/components/blog/BlogClient.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Remove initial fetch useEffect
content = content.replace(/useEffect\(\(\) => \{\s*fetch\(getEndpoint\('\/api\/blogs'\)\)[\s\S]*?\.catch\(\(err\) => \{[\s\S]*?\}\);\s*\}, \[\]\);/m, '');

// 2. Replace useMemo for filteredBlogs with useEffect for fetchFilteredBlogs
const oldFilterRegex = /\/\/ 3\. Filtering & Sorting\s*const filteredBlogs = useMemo\(\(\) => \{[\s\S]*?return result;\s*\}, \[blogs, searchQuery, activeCategory, activeTab, sortBy, savedBlogs\]\);/m;

const newFilterCode = `  // 3. Server-side Filtering & Pagination
  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      setLoading(true);
      try {
        let url = \`/api/blogs?page=1&limit=12\`;
        if (activeCategory !== 'All Blogs') url += \`&category=\${encodeURIComponent(activeCategory)}\`;
        if (searchQuery.trim()) url += \`&search=\${encodeURIComponent(searchQuery.trim())}\`;
        if (sortBy !== 'Newest First') url += \`&sort=\${encodeURIComponent(sortBy)}\`;

        const res = await fetch(getEndpoint(url));
        const data = await res.json();
        
        if (data.success) {
          let results = data.data;
          if (activeTab === 'Favorites') {
             results = results.filter((b: any) => savedBlogs.includes(b._id));
          }
          setBlogs(results);
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
      fetchFilteredBlogs();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, searchQuery, sortBy, activeTab, savedBlogs]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url = \`/api/blogs?page=\${page + 1}&limit=12\`;
      if (activeCategory !== 'All Blogs') url += \`&category=\${encodeURIComponent(activeCategory)}\`;
      if (searchQuery.trim()) url += \`&search=\${encodeURIComponent(searchQuery.trim())}\`;
      if (sortBy !== 'Newest First') url += \`&sort=\${encodeURIComponent(sortBy)}\`;

      const res = await fetch(getEndpoint(url));
      const data = await res.json();
      
      if (data.success) {
        let results = data.data;
        if (activeTab === 'Favorites') {
           results = results.filter((b: any) => savedBlogs.includes(b._id));
        }
        setBlogs(prev => [...prev, ...results]);
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
  }, [hasMore, loading, page, activeCategory, searchQuery, sortBy, activeTab, savedBlogs]);`;

content = content.replace(oldFilterRegex, newFilterCode);

// 3. Change listBlogs to use blogs instead of filteredBlogs
content = content.replace(/const listBlogs = filteredBlogs\.filter/g, 'const listBlogs = blogs.filter');
content = content.replace(/filteredBlogs\.length/g, 'blogs.length');

// 4. Update the Load More button to use observerTarget
const loadMoreButtonRegex = /\{listBlogs\.length < filteredBlogs\.length && \([\s\S]*?\}\)/m;
const loadMoreButtonReplacement = `
            {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5]"></div>
              </div>
            )}
            <div ref={observerTarget} className="h-10 mt-8" />`;

// Wait, the Load More button in BlogClient is probably different. Let's find it.
// We'll just replace the button code directly if it exists, or append it after the listBlogs map.
content = content.replace(/\{visibleCount < filteredBlogs\.length && \([\s\S]*?\}\)/m, loadMoreButtonReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log('BlogClient patched!');
