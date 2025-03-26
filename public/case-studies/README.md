# Case Studies Placeholder Images

This directory contains placeholder images for case studies displayed in the transformation showcase section.

## HTML Templates

The `.html` files in this directory are templates for creating the actual images. They provide a consistent styling and layout for all case study images.

## Creating Images from HTML Templates

You can create actual JPG images from these HTML templates using one of the following methods:

### Method 1: Manual Screenshot

1. Open any `.html` file in your browser
2. Take a screenshot of the rendered page
3. Crop and save the image with the same name but with a `.jpg` extension

### Method 2: Automated Conversion

For automated conversion, use the provided script:

```bash
# Install puppeteer
npm install puppeteer

# Run the conversion script
node scripts/html-to-images.js
```

## Placeholder Image Descriptions

The following placeholder images are included:

### Sarah Johnson (Life Coach)
- `sarah-instagram.jpg` - Instagram post example 
- `sarah-youtube.jpg` - YouTube video example

### Jason Miller (Fitness Expert)
- `jason-miller.jpg` - Profile photo
- `jason-fitness-post.jpg` - Instagram fitness post
- `jason-tiktok.jpg` - TikTok video example

### Emily Roberts (Business Coach)
- `emily-linkedin.jpg` - LinkedIn post example
- `emily-website.jpg` - Website content example

### Michael Chen (Real Estate Agent)
- `michael-instagram.jpg` - Instagram post example
- `michael-youtube.jpg` - YouTube video example

### Sophia Martinez (Digital Product Creator)
- `sophia-tiktok.jpg` - TikTok content example
- `sophia-instagram.jpg` - Instagram post example

## Using Your Own Images

To use your own images instead of the placeholders:

1. Replace any of the files with your actual case study images
2. Keep the same filenames to ensure they're correctly linked in the code
3. Make sure your images maintain a similar aspect ratio (preferably 4:3 or 16:9) for best presentation

## Image Optimization

For best performance, consider optimizing your images:

- Keep file sizes under 200KB if possible
- Use JPG format for photos and content screenshots
- Use proper dimensions (recommended: 600x400px or similar aspect ratio) 