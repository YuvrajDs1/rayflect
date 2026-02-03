import path from 'path';
import * as fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'contact-form-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res, next) => {
            if (req.method === 'POST') {
              const chunks = [];
              req.on('data', (chunk) => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                  const filename = `inquiry_${timestamp}.json`;

                  // Use path.join for cross-platform compatibility
                  const filePath = path.join(process.cwd(), 'data', 'inquiries', filename);

                  // Ensure directory exists
                  const dir = path.dirname(filePath);
                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                  }

                  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, file: filename }));
                } catch (err) {
                  console.error('Error saving contact form:', err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Failed to save data' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
