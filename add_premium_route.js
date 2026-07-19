const fs = require('fs');

let c = fs.readFileSync('backend/src/routes/tools.routes.ts', 'utf8');

const importPremiumConfig = `import { premiumPrompts } from '../config/premiumPrompts';\n`;
if (!c.includes('premiumPrompts')) {
  c = c.replace(`import { ShortUrl } from '../models/ShortUrl';`, `import { ShortUrl } from '../models/ShortUrl';\n${importPremiumConfig}`);
}

const newRoute = `
// POST /api/tools/generate-premium
router.post('/generate-premium', async (req: Request, res: Response) => {
  try {
    const { input, toolSlug, toolName } = req.body;
    if (!input || !toolSlug) return res.status(400).json({ success: false, message: 'Input and toolSlug are required' });

    let user = null;
    let creditsNeeded = 5;
    
    const token = req.cookies?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        user = await User.findById(decoded.id);
      } catch (err) {}
    }

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

    const systemPrompt = premiumPrompts[toolSlug];
    if (!systemPrompt) {
      return res.status(400).json({ success: false, message: 'Invalid premium tool slug' });
    }

    const prompt = \`\${systemPrompt}\\n\\nUser Requirement:\\n\${input}\`;
    
    const result = await generateToolText({ prompt, contentType: toolName || 'Premium Content', tone: 'Professional', language: 'English', creativity: 7 });

    const usageId = await saveFreeToolUsage(req, '/tools/' + toolSlug, toolName || 'Premium Generator', input, result);
    
    res.json({ success: true, text: result, usageId, creditsRemaining: user ? user.credits : undefined });
  } catch (error) {
    console.error('Premium Generation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate premium content' });
  }
});
`;

if (!c.includes('/generate-premium')) {
  // inject before export default router;
  c = c.replace('export default router;', `${newRoute}\nexport default router;`);
  fs.writeFileSync('backend/src/routes/tools.routes.ts', c);
  console.log('Added generic premium endpoint to tools.routes.ts');
} else {
  console.log('Endpoint already exists');
}
