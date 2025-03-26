// Simple script to generate placeholder images for case studies
// To run: node scripts/generate-placeholders.js

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the case-studies directory exists
const caseStudiesDir = join(__dirname, '../public/case-studies');
try {
  await fs.mkdir(caseStudiesDir, { recursive: true });
} catch (err) {
  console.error('Error creating directory:', err);
}

// Define the placeholder images we need to generate
const placeholders = [
  // Sarah Johnson
  { name: 'sarah-instagram.jpg', type: 'Instagram', client: 'Sarah J.', bgColor: '#e0f2fe' },
  { name: 'sarah-youtube.jpg', type: 'YouTube', client: 'Sarah J.', bgColor: '#fee2e2' },
  
  // Jason Miller
  { name: 'jason-miller.jpg', type: 'Profile', client: 'Jason M.', bgColor: '#dcfce7' },
  { name: 'jason-fitness-post.jpg', type: 'Instagram', client: 'Jason M.', bgColor: '#f0fdf4' },
  { name: 'jason-tiktok.jpg', type: 'TikTok', client: 'Jason M.', bgColor: '#fef9c3' },
  
  // Emily Roberts
  { name: 'emily-linkedin.jpg', type: 'LinkedIn', client: 'Emily R.', bgColor: '#dbeafe' },
  { name: 'emily-website.jpg', type: 'Website', client: 'Emily R.', bgColor: '#f3e8ff' },
  
  // Michael Chen
  { name: 'michael-instagram.jpg', type: 'Instagram', client: 'Michael C.', bgColor: '#fce7f3' },
  { name: 'michael-youtube.jpg', type: 'YouTube', client: 'Michael C.', bgColor: '#ffedd5' },
  
  // Sophia Martinez
  { name: 'sophia-tiktok.jpg', type: 'TikTok', client: 'Sophia M.', bgColor: '#d1fae5' },
  { name: 'sophia-instagram.jpg', type: 'Instagram', client: 'Sophia M.', bgColor: '#e0e7ff' },
];

// Generate HTML for each placeholder
for (const placeholder of placeholders) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${placeholder.client} - ${placeholder.type} Placeholder</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: ${placeholder.bgColor};
    }
    .container {
      width: 600px;
      height: 400px;
      background-color: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
    }
    .header {
      padding: 16px;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      align-items: center;
    }
    .profile {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #4b5563;
    }
    .header-text {
      margin-left: 12px;
    }
    .name {
      font-weight: 600;
      color: #1f2937;
    }
    .type {
      font-size: 14px;
      color: #6b7280;
    }
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background-color: ${placeholder.bgColor}30;
    }
    .placeholder-text {
      text-align: center;
      color: #374151;
      font-size: 24px;
      font-weight: 600;
    }
    .footer {
      padding: 16px;
      border-top: 1px solid #f3f4f6;
      display: flex;
      justify-content: space-between;
      color: #6b7280;
      font-size: 14px;
    }
    .logo {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-weight: bold;
      color: #4b5563;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="profile">${placeholder.client[0]}</div>
      <div class="header-text">
        <div class="name">${placeholder.client}</div>
        <div class="type">${placeholder.type} Content</div>
      </div>
    </div>
    <div class="content">
      <div class="placeholder-text">
        ${placeholder.type} Content<br>
        <span style="font-size: 16px; font-weight: normal; color: #6b7280;">
          Placeholder for client case study
        </span>
      </div>
    </div>
    <div class="footer">
      <div>CLYC.io Transformation</div>
      <div>Content Showcase</div>
    </div>
  </div>
  <div class="logo">CLYC.io</div>
</body>
</html>
  `;

  try {
    await fs.writeFile(join(__dirname, `../public/case-studies/${placeholder.name}.html`), html);
    console.log(`Created placeholder HTML for ${placeholder.name}`);
  } catch (err) {
    console.error(`Error creating HTML for ${placeholder.name}:`, err);
  }
}

console.log('\nPlaceholder HTML files have been generated in the public/case-studies directory.');
console.log('To convert these to images, open each HTML file in a browser and take screenshots.');
console.log('Alternatively, use a tool like Puppeteer to automate the screenshot process.'); 