// Script to convert HTML placeholder files to JPG images using Puppeteer
// To run: 
// 1. npm install puppeteer
// 2. node scripts/html-to-images.js

import { promises as fs } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CASE_STUDIES_DIR = join(__dirname, '../public/case-studies');

// Function to convert HTML file to JPG
async function convertHtmlToJpg(htmlFile, outputFile) {
  console.log(`Converting ${htmlFile} to ${outputFile}...`);
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match the container size defined in the HTML
    await page.setViewport({ width: 800, height: 600 });
    
    // Load HTML file
    await page.goto(`file://${htmlFile}`, {
      waitUntil: 'networkidle0',
    });
    
    // Ensure the content is fully rendered
    await page.waitForTimeout(500);
    
    // Take a screenshot
    await page.screenshot({
      path: outputFile,
      quality: 90,
      type: 'jpeg',
    });
    
    await browser.close();
    console.log(`✅ Successfully created ${outputFile}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${htmlFile}:`, error.message);
    return false;
  }
}

// Main function to process all HTML files
async function processHtmlFiles() {
  try {
    // Get all HTML files in the case-studies directory
    const files = await fs.readdir(CASE_STUDIES_DIR);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    if (htmlFiles.length === 0) {
      console.log('No HTML files found in the case-studies directory.');
      return;
    }
    
    console.log(`Found ${htmlFiles.length} HTML files to convert.`);
    
    // Process each HTML file
    for (const htmlFile of htmlFiles) {
      const htmlFilePath = join(CASE_STUDIES_DIR, htmlFile);
      const outputFileName = basename(htmlFile, '.html');
      const jpgFilePath = join(CASE_STUDIES_DIR, outputFileName);
      
      await convertHtmlToJpg(htmlFilePath, jpgFilePath);
    }
    
    console.log('\nAll HTML files have been converted to JPG images.');
  } catch (error) {
    console.error('Error processing HTML files:', error.message);
  }
}

// Run the script
processHtmlFiles(); 