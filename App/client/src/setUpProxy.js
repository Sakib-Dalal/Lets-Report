// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com',
      changeOrigin: true,
    })
  );
};
