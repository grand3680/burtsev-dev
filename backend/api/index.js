// Vercel Serverless Function entry.
// Делегирует в собранный NestJS (dist/serverless.js). Собирается через `npm run build`.
module.exports = require('../dist/serverless').handler
