const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const BASE_URL = 'https://uigenkit.in';

// List all your important URLs here
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/colorpalette', changefreq: 'weekly', priority: 0.9 },
  { url: '/lineargradient', changefreq: 'weekly', priority: 0.9 },
  { url: '/neumorphism', changefreq: 'weekly', priority: 0.9 },
  { url: '/pattern', changefreq: 'weekly', priority: 0.9 },
  { url: '/glassmorphism', changefreq: 'weekly', priority: 0.9 }
  // add more pages as needed
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: BASE_URL });

  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
}


module.exports = generateSitemap;
