
import fs from 'fs';
import { join } from 'path';


/**
 * Endware that serves the index.html file with dynamic meta tags based on the request path.
 * Reads the index.html file from the client/dist directory, injects route-specific or default
 * meta tags into the <head> section, and sends the modified HTML to the client.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.path - The current request path used to determine which metadata to inject
 * @param {Object} res - Express response object
 * @returns {void} Sends the modified HTML response or a 500 error if file reading fails
 * 
 * @example
 * // Use as Express middleware
 * app.get('*', metadata);
 */
export default function metadata(req, res) {

  fs.readFile(join(process.cwd(), 'client/dist', 'index.html'), 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error reading index.html');
    };

    const
      metaDataLookup = {
        '/about': {
          title: 'About | goodsie.ca',
          description: 'Learn about Goodsie.ca, its mission, and the team behind it all.'
        },
        
        '/contact': {
          title: 'Contact | goodsie.ca',
          description: 'Contact Goodsie.ca for inquiries and collaborations.'
        }
      },

      defaultMeta = {
        title: 'goodsie.ca',
        description: 'Welcome to Goodsie.ca, your hub for innovative solutions and creative projects.'
      },

      currentPath = req.path,
      { title, description } = metaDataLookup[currentPath] || defaultMeta,

      metaTagsBlock = `
      <title>${title}</title>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${description}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.goodsie.ca${currentPath}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="https://www.goodsie.ca/images/meta-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.goodsie.ca${currentPath}" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="https://www.goodsie.ca/images/meta-image.png" />
      <link rel="canonical" href="https://www.goodsie.ca${currentPath}" />
    `;

    const htmlWithMeta = html.replace(/<head>[\s\S]*?<\/head>/, `<head>${metaTagsBlock}</head>`);

    res.send(htmlWithMeta);
  });
};
