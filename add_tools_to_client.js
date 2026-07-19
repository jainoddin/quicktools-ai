const fs = require('fs');

const tools = [
  { slug: 'ai-marketing-plan', name: 'AI Marketing Plan Generator', desc: 'Generate a comprehensive marketing plan and strategy.', category: 'Marketing', icon: 'Target', color: 'bg-[#EC4899]' },
  { slug: 'ai-startup-ideas', name: 'AI Startup Idea Generator', desc: 'Generate validated startup ideas based on market trends.', category: 'Business', icon: 'Lightbulb', color: 'bg-[#F59E0B]' },
  { slug: 'ai-swot-analysis', name: 'AI SWOT Analysis Generator', desc: 'Generate a detailed SWOT analysis for your business.', category: 'Business', icon: 'BarChart2', color: 'bg-[#3B82F6]' },
  { slug: 'ai-investor-update', name: 'AI Investor Update Generator', desc: 'Write professional updates for your startup investors.', category: 'Business', icon: 'Briefcase', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-press-release', name: 'AI Press Release Writer', desc: 'Write compelling press releases for your announcements.', category: 'Marketing', icon: 'Megaphone', color: 'bg-[#EF4444]' },
  { slug: 'ai-okr-generator', name: 'AI OKR Generator', desc: 'Generate Objectives and Key Results for your teams.', category: 'Business', icon: 'Target', color: 'bg-[#10B981]' },
  { slug: 'ai-employee-review', name: 'AI Employee Performance Review', desc: 'Write constructive employee performance reviews.', category: 'Business', icon: 'Users', color: 'bg-[#6366F1]' },
  { slug: 'ai-brand-guidelines', name: 'AI Brand Guidelines Generator', desc: 'Create comprehensive brand identity guidelines.', category: 'Design', icon: 'Palette', color: 'bg-[#EC4899]' },
  { slug: 'ai-user-persona', name: 'AI User Persona Creator', desc: 'Generate detailed buyer and user personas.', category: 'Marketing', icon: 'Users', color: 'bg-[#F59E0B]' },
  { slug: 'ai-customer-journey', name: 'AI Customer Journey Mapper', desc: 'Map out the end-to-end customer journey.', category: 'Marketing', icon: 'Map', color: 'bg-[#3B82F6]' },
  { slug: 'ai-cold-email', name: 'AI B2B Cold Email Sequence', desc: 'Generate high-converting B2B cold email sequences.', category: 'Sales', icon: 'Mail', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-sales-script', name: 'AI Sales Cold Call Script', desc: 'Generate effective scripts for sales calls.', category: 'Sales', icon: 'PhoneCall', color: 'bg-[#10B981]' },
  { slug: 'ai-objection-handling', name: 'AI Sales Objection Handler', desc: 'Generate responses to common sales objections.', category: 'Sales', icon: 'Shield', color: 'bg-[#EF4444]' },
  { slug: 'ai-lead-magnet', name: 'AI Lead Magnet Idea Generator', desc: 'Generate compelling lead magnet ideas to grow your list.', category: 'Marketing', icon: 'Magnet', color: 'bg-[#F59E0B]' },
  { slug: 'ai-webinar-script', name: 'AI Webinar Script Generator', desc: 'Generate engaging scripts for your webinars.', category: 'Marketing', icon: 'Video', color: 'bg-[#3B82F6]' },
  { slug: 'ai-course-outline', name: 'AI Masterclass Course Outline', desc: 'Generate detailed course outlines and curriculum.', category: 'Education', icon: 'GraduationCap', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-podcast-script', name: 'AI Podcast Episode Script', desc: 'Generate structured scripts for podcast episodes.', category: 'Media', icon: 'Mic', color: 'bg-[#EC4899]' },
  { slug: 'ai-video-storyboard', name: 'AI Video Storyboard Generator', desc: 'Generate detailed scene-by-scene video storyboards.', category: 'Media', icon: 'Film', color: 'bg-[#10B981]' },
  { slug: 'ai-newsletter-content', name: 'AI Newsletter Content Generator', desc: 'Generate engaging content for email newsletters.', category: 'Marketing', icon: 'MailOpen', color: 'bg-[#F59E0B]' },
  { slug: 'ai-case-study', name: 'AI Case Study Writer', desc: 'Write professional business case studies.', category: 'Business', icon: 'FileText', color: 'bg-[#3B82F6]' },
  { slug: 'ai-whitepaper-outline', name: 'AI Whitepaper Outline', desc: 'Generate structured outlines for B2B whitepapers.', category: 'Business', icon: 'BookOpen', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-landing-page-copy', name: 'AI Landing Page Copywriter', desc: 'Generate high-converting copy for landing pages.', category: 'Marketing', icon: 'Layout', color: 'bg-[#EC4899]' },
  { slug: 'ai-abandoned-cart', name: 'AI Abandoned Cart Email Series', desc: 'Generate email sequences to recover lost sales.', category: 'Marketing', icon: 'ShoppingCart', color: 'bg-[#EF4444]' },
  { slug: 'ai-product-launch', name: 'AI Product Launch Strategy', desc: 'Generate a comprehensive product launch plan.', category: 'Marketing', icon: 'Rocket', color: 'bg-[#3B82F6]' },
  { slug: 'ai-value-proposition', name: 'AI Value Proposition Generator', desc: 'Generate unique value propositions for your products.', category: 'Business', icon: 'Star', color: 'bg-[#F59E0B]' },
  { slug: 'ai-competitor-analysis', name: 'AI Competitor Analysis', desc: 'Generate detailed competitor analysis reports.', category: 'Business', icon: 'TrendingUp', color: 'bg-[#10B981]' },
  { slug: 'ai-pricing-strategy', name: 'AI Pricing Strategy Generator', desc: 'Generate optimized pricing strategies and tiers.', category: 'Business', icon: 'DollarSign', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-business-model', name: 'AI Business Model Canvas', desc: 'Generate a complete Business Model Canvas.', category: 'Business', icon: 'Grid', color: 'bg-[#3B82F6]' },
  { slug: 'ai-risk-assessment', name: 'AI Risk Assessment Report', desc: 'Generate detailed business risk assessments.', category: 'Business', icon: 'AlertTriangle', color: 'bg-[#EF4444]' },
  { slug: 'ai-sustainability-plan', name: 'AI ESG / Sustainability Plan', desc: 'Generate corporate sustainability and ESG plans.', category: 'Business', icon: 'Leaf', color: 'bg-[#10B981]' },
  { slug: 'ai-onboarding-plan', name: 'AI Employee Onboarding Plan', desc: 'Generate structured 30-60-90 day onboarding plans.', category: 'HR', icon: 'UserPlus', color: 'bg-[#3B82F6]' },
  { slug: 'ai-training-module', name: 'AI Training Module Generator', desc: 'Generate corporate training modules and quizzes.', category: 'HR', icon: 'Book', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-company-culture', name: 'AI Company Culture Guide', desc: 'Generate company culture and values handbooks.', category: 'HR', icon: 'Heart', color: 'bg-[#EC4899]' },
  { slug: 'ai-job-interview-rubric', name: 'AI Interview Scoring Rubric', desc: 'Generate standardized interview scoring rubrics.', category: 'HR', icon: 'CheckSquare', color: 'bg-[#F59E0B]' },
  { slug: 'ai-crisis-management', name: 'AI Crisis Management Plan', desc: 'Generate step-by-step crisis communication plans.', category: 'Business', icon: 'LifeBuoy', color: 'bg-[#EF4444]' },
  { slug: 'ai-pr-pitch', name: 'AI PR Media Pitch Generator', desc: 'Generate compelling media pitches for journalists.', category: 'Marketing', icon: 'Send', color: 'bg-[#3B82F6]' },
  { slug: 'ai-event-sponsorship', name: 'AI Event Sponsorship Deck', desc: 'Generate sponsorship proposal decks for events.', category: 'Business', icon: 'Award', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-grant-report', name: 'AI Grant Progress Report', desc: 'Write professional progress reports for grants.', category: 'Business', icon: 'FileCheck', color: 'bg-[#10B981]' },
  { slug: 'ai-partnership-proposal', name: 'AI Partnership Proposal', desc: 'Generate B2B strategic partnership proposals.', category: 'Business', icon: 'Handshake', color: 'bg-[#F59E0B]' },
  { slug: 'ai-franchise-manual', name: 'AI Franchise Operations Manual', desc: 'Generate standard operating procedures for franchises.', category: 'Business', icon: 'Settings', color: 'bg-[#6366F1]' },
];

// Load ToolsClient.tsx
let c = fs.readFileSync('frontend/components/tools/ToolsClient.tsx', 'utf8');

// Find where the tools array ends: just before "];\\n\\n\\nfunction ToolsClientInner"
const insertBefore = `];\n\n\nfunction ToolsClientInner`;

// Build the new tool entries
let newEntries = '\n';
tools.forEach(tool => {
  newEntries += `  {\n`;
  newEntries += `    name: "${tool.name}",\n`;
  newEntries += `    description: "${tool.desc}",\n`;
  newEntries += `    iconName: "${tool.icon}",\n`;
  newEntries += `    color: "${tool.color}",\n`;
  newEntries += `    slug: "/tools/${tool.slug}",\n`;
  newEntries += `    category: "${tool.category}",\n`;
  newEntries += `    isPremium: true,\n`;
  newEntries += `    createdAt: new Date().toISOString()\n`;
  newEntries += `  },\n`;
});

// Replace the closing of the tools array
c = c.replace(insertBefore, `${newEntries}${insertBefore}`);

fs.writeFileSync('frontend/components/tools/ToolsClient.tsx', c);
console.log('Successfully added 40 new premium tools to ToolsClient.tsx!');

// Verify count
const matches = c.match(/name: "/g);
console.log('Total tool entries now:', matches ? matches.length : 0);
