const { defineConfig } = require("rolldown");
const { terser } = require("rollup-plugin-terser");

const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  input: "src/app.js",
  plugins: isProd
    ? [
        terser({
          format: {
            comments: (node, comment) => {
              // comment.type: 1 => //, 2 => /* */
              return /==UserScript==|==\/UserScript==|@name|@match|@grant|@version|@description|@license|@downloadURL|@updateURL/.test(
                comment.value
              );
            },
          },
        }),
      ]
    : [],
  output: {
    file: "dist/bundle.js",
    format: "iife",
    banner: `// ==UserScript==
// @name        打开NestJs中文文档
// @namespace   Violentmonkey Scripts
// @match       https://docs.nestjs.com/*
// @grant       none
// @version     1.0
// @author      Liao Brant
// @description 从nestjs英文文档一键打开中文文档
// @license     MIT
// @downloadURL https://update.greasyfork.org/scripts/529353/%E6%89%93%E5%BC%80NestJs%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3.user.js
// @updateURL https://update.greasyfork.org/scripts/529353/%E6%89%93%E5%BC%80NestJs%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3.meta.js
// ==/UserScript==
`,
  },
});
