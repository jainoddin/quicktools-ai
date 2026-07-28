const fs = require('fs');

const tsxContent = fs.readFileSync('c:\\Users\\jain\\.gemini\\antigravity\\scratch\\quicktools-project\\frontend\\components\\tools\\ToolsClient.tsx', 'utf-8');

const allToolsMatch = tsxContent.match(/export const allTools = (\[[\s\S]+?\]);\s*(export|const|function|\n\n)/);
let toolsArrayString = allToolsMatch ? allToolsMatch[1] : '';

if (toolsArrayString) {
  // Use a simple evaluation to get the objects
  // Replace new Date().toISOString().split('T')[0] with a static string so eval works
  let safeStr = toolsArrayString.replace(/new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]/g, "'2026-07-28'");
  
  // Try to eval
  let tools = [];
  try {
    tools = eval("(" + safeStr + ")");
  } catch(e) {
    console.error("Eval failed: " + e);
  }
  
  if (tools.length > 0) {
    let dartCode = "import 'package:flutter/material.dart';\n\n";
    dartCode += "final List<Map<String, dynamic>> allMockTools = [\n";
    
    // Map icons
    const iconMapping = {
      'ImageIcon': 'Icons.image_outlined',
      'LayoutGrid': 'Icons.grid_view_rounded',
      'PenTool': 'Icons.edit_outlined',
      'Video': 'Icons.videocam_outlined',
      'Code': 'Icons.code_rounded',
      'Scale': 'Icons.balance_outlined',
      'Handshake': 'Icons.handshake_outlined',
      'CloudSun': 'Icons.cloud_queue_outlined',
      'Lightbulb': 'Icons.lightbulb_outline',
      'DollarSign': 'Icons.attach_money_rounded',
      'Code2': 'Icons.code_outlined',
      'Users': 'Icons.people_outline',
      'Database': 'Icons.storage_outlined',
      'Megaphone': 'Icons.campaign_outlined',
      'Mic2': 'Icons.mic_none_outlined',
      'Briefcase': 'Icons.business_center_outlined',
      'Map': 'Icons.map_outlined',
      'Utensils': 'Icons.restaurant_outlined',
      'Wind': 'Icons.air_outlined',
      'MessageSquare': 'Icons.chat_bubble_outline',
      'Calendar': 'Icons.calendar_today_outlined',
      'PlaySquare': 'Icons.play_circle_outline',
      'GitBranch': 'Icons.alt_route_outlined',
      'Home': 'Icons.home_outlined',
      'FileX': 'Icons.cancel_presentation_outlined',
      'SmilePlus': 'Icons.sentiment_satisfied_outlined',
      'FileText': 'Icons.description_outlined',
      'Languages': 'Icons.translate_outlined',
      'FileUser': 'Icons.contact_page_outlined',
      'Palette': 'Icons.palette_outlined',
      'Link2': 'Icons.link_outlined',
      'SpellCheck': 'Icons.spellcheck',
      'Hash': 'Icons.tag_outlined',
      'BookOpen': 'Icons.menu_book_outlined'
    };
    
    for (let t of tools) {
      // Extract color from "bg-[#6D5EF8] text-white"
      let colorHex = '0xFF6D5EF8'; // default
      let m = t.color.match(/bg-\[#(.*?)\]/);
      if (m) {
        colorHex = '0xFF' + m[1].toUpperCase();
      } else if (t.color.includes('bg-blue-500')) colorHex = '0xFF3B82F6';
      else if (t.color.includes('bg-green-500')) colorHex = '0xFF22C55E';
      else if (t.color.includes('bg-purple-500')) colorHex = '0xFFA855F7';
      else if (t.color.includes('bg-red-500')) colorHex = '0xFFEF4444';
      else if (t.color.includes('bg-orange-500')) colorHex = '0xFFF97316';
      
      let mappedIcon = iconMapping[t.iconName] || 'Icons.build_circle_outlined';
      
      let isPopular = t.tag && t.tag.type === 'popular';
      let isNew = t.tag && t.tag.type === 'new';
      let isFree = t.tag && t.tag.type === 'free';
      
      // Generate some fake rating based on title length or just random
      let r = 4.5 + (t.name.length % 5) / 10;
      let count = 100 + (t.name.length * 10) + (t.description.length * 2);
      let ratingStr = `${r.toFixed(1)} (${count >= 1000 ? (count/1000).toFixed(1) + 'K' : count})`;
      
      dartCode += `  {\n`;
      dartCode += `    'title': '${t.name.replace(/'/g, "\\'")}',\n`;
      dartCode += `    'description': '${t.description.replace(/'/g, "\\'")}',\n`;
      dartCode += `    'icon': ${mappedIcon},\n`;
      dartCode += `    'color': const Color(${colorHex}),\n`;
      dartCode += `    'rating': '${ratingStr}',\n`;
      dartCode += `    'isPopular': ${isPopular ? 'true' : 'false'},\n`;
      dartCode += `    'isNew': ${isNew ? 'true' : 'false'},\n`;
      dartCode += `    'isFree': ${isFree ? 'true' : 'false'},\n`;
      dartCode += `    'category': '${t.category}',\n`;
      dartCode += `  },\n`;
    }
    
    dartCode += "];\n";
    
    fs.writeFileSync('c:\\Users\\jain\\.gemini\\antigravity\\scratch\\quicktools-project\\quicktools_app\\lib\\features\\home\\data\\tools_data.dart', dartCode);
    console.log(`Successfully wrote ${tools.length} tools to tools_data.dart`);
  }
} else {
  console.log("Could not find allTools array.");
}
