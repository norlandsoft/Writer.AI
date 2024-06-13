import {defineConfig} from "umi";
const { resolve } = require('path');

export default defineConfig({
  dva: {},
  title: 'Writer.AI',
  links: [
    {rel: 'shortcut icon', href: '/favicon.svg'}
  ],
  routes: [
    {
      path: "/",
      component: "@/layouts/BasicLayout"
    },
    {
      path: "*",
      component: "@/layouts/Error404"
    }
  ],
  proxy: {
    "/rest": {
      target: "http://localhost:6600",
      changeOrigin: true,
      pathRewrite: {"^": ""},
      'onProxyRes': function(proxyRes, req, res) {
        proxyRes.headers['Content-Encoding'] = 'chunked';
      }
    },
  },
  alias: {
    //'aird': resolve(__dirname, 'node_modules/air-design/lib'),
    'aird': resolve(__dirname, 'src/components/air-design'),
  },
  base: "/",
  outputPath: "../air-writer/src/main/resources/static",
});