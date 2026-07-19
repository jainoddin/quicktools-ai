const fs = require('fs');
const path = require('path');

const premiumTools = [
  { slug: 'ai-business-plan', type: 'Business Plan', prompt: 'Act as an expert Business Strategist. Generate a comprehensive 10-page business plan based on the following details. Include Executive Summary, Market Analysis, Competitive Advantage, and Financial Projections. Format professionally in Markdown with proper headings.\n\nDetails:\n' },
  { slug: 'ai-sales-funnel', type: 'Sales Funnel Copy', prompt: 'Act as an expert Copywriter. Write complete sales funnel copy for the following product/service. Include: 1) Facebook Ad Copy, 2) Landing Page Headline & Body, 3) 3-part Email Sequence. Format nicely in Markdown.\n\nProduct Details:\n' },
  { slug: 'ai-ebook-writer', type: 'E-Book', prompt: 'Act as an expert Author. Write a detailed outline and the first full chapter for an e-book about the following topic. Make the content engaging and informative. Format in Markdown.\n\nTopic:\n' },
  { slug: 'ai-course-creator', type: 'Course Curriculum', prompt: 'Act as an expert Instructional Designer. Create a comprehensive 4-week course curriculum for the following subject. Include weekly modules, lesson titles, and 2 quiz questions per week. Format in Markdown.\n\nSubject:\n' },
  { slug: 'ai-seo-topical-map', type: 'SEO Topical Map', prompt: 'Act as an SEO Expert. Generate a comprehensive Topical Map (Content Cluster) for the following niche. Group the topics into 5 main pillars and provide 5 article titles for each pillar. Format as a nested list in Markdown.\n\nNiche:\n' },
  { slug: 'ai-pitch-deck', type: 'Pitch Deck', prompt: 'Act as an expert Startup Advisor. Generate the content and script for a 10-slide startup pitch deck based on the following idea. Include Problem, Solution, Market Size, Business Model, and Ask. Format in Markdown.\n\nStartup Idea:\n' },
  { slug: 'ai-app-architecture', type: 'App Architecture', prompt: 'Act as a Senior Software Architect. Design the system architecture for the following application idea. Include the recommended Tech Stack, High-Level Database Schema, and Core API Endpoints. Format clearly in Markdown.\n\nApp Idea:\n' },
  { slug: 'ai-grant-proposal', type: 'Grant Proposal', prompt: 'Act as an expert Grant Writer. Write a professional and persuasive grant proposal based on the following project details. Include Need Statement, Objectives, Methodology, and Evaluation. Format in Markdown.\n\nProject Details:\n' },
  { slug: 'ai-legal-template', type: 'Legal Template', prompt: 'Act as a Paralegal. Generate a standard, boilerplate legal template based on the following requirement (e.g., NDA, Freelance Contract). Disclaimer: This is for educational purposes and not official legal advice. Format in Markdown.\n\nRequirement:\n' },
  { slug: 'ai-social-calendar', type: 'Social Media Calendar', prompt: 'Act as a Social Media Manager. Create a 30-day social media content calendar for the following brand/topic. Provide specific post ideas for each day across different platforms (Instagram, LinkedIn, Twitter). Format as a table in Markdown.\n\nBrand/Topic:\n' },
];

const backendRoutesPath = 'backend/src/routes/tools.routes.ts';
let routesContent = fs.readFileSync(backendRoutesPath, 'utf8');

const exportIndex = routesContent.lastIndexOf('export default router;');

let newRoutes = '';

premiumTools.forEach(tool => {
  const routeCode = `
// POST /api/tools/${tool.slug}
router.post('/${tool.slug}', async (req: Request, res: Response) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ success: false, message: 'Input is required' });

    let user = null;
    let creditsNeeded = 5;
    
    // Optional Auth Check
    const token = req.cookies?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        user = await User.findById(decoded.id);
      } catch (err) {}
    }

    // If logged in, check and deduct credits for EVERYONE (Free and Pro)
    if (user) {
      if (user.credits < creditsNeeded) {
        return res.status(403).json({ 
          success: false, 
          message: 'Not enough credits. Please upgrade or buy more.',
          errorType: 'INSUFFICIENT_CREDITS'
        });
      }
      user.credits -= creditsNeeded;
      await user.save();
    }
    // If not logged in, we let it pass because frontend allows 1 free trial for guests. 
    // We could add server-side IP rate-limiting, but this matches ai-writer logic for now.

    const prompt = \`${tool.prompt}\${input}\`;
    const result = await generateToolText({ prompt, contentType: '${tool.type}', tone: 'Professional', language: 'English', creativity: 7 });

    const usageId = await saveFreeToolUsage(req, '/tools/${tool.slug}', '${tool.type} Generator', input, result);
    
    res.json({ success: true, text: result, usageId, creditsRemaining: user ? user.credits : undefined });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to generate content' });
  }
});
`;
  if (!routesContent.includes(`'/api/tools/${tool.slug}'`) && !routesContent.includes(`'/${tool.slug}'`)) {
    newRoutes += routeCode;
  }
});

if (newRoutes) {
  routesContent = routesContent.slice(0, exportIndex) + newRoutes + '\n' + routesContent.slice(exportIndex);
  fs.writeFileSync(backendRoutesPath, routesContent);
  console.log('Appended 10 premium routes to tools.routes.ts');
} else {
  console.log('Routes already exist.');
}
