import {defineConfig} from "umi";
const { resolve } = require('path');

export default defineConfig({
  dva: {},
  title: 'AirMachine',
  links: [
    {id: 'theme', rel: 'stylesheet', type: 'text/css'},
    {rel: 'shortcut icon', href: '/favicon.svg'}
  ],
  routes: [
    {
      path: "/",
      component: "@/layouts/SecurityLayout"
    },
    {
      path: "*",
      component: "@/layouts/Error404"
    }
  ],
  proxy: {
    "/rest": {
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: {"^": ""},
      'onProxyRes': function(proxyRes, req, res) {
        proxyRes.headers['Content-Encoding'] = 'chunked';
      }
    },
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: {"^": ""},
      'onProxyRes': function(proxyRes, req, res) {
        proxyRes.headers['Content-Encoding'] = 'chunked';
      }
    },
    "/initialAdminPassword": {
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: {"^": ""}
    }
  },
  alias: {
    //'aird': resolve(__dirname, 'node_modules/air-design/lib'),
    'aird': resolve(__dirname, 'src/components/air-design'),
  },
  base: "/",
  outputPath: "../air-machine/air-machine-platform/src/main/resources/static",
});