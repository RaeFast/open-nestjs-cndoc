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
    banner: require("fs").readFileSync(
      require("path").resolve(__dirname, "src/userScriptHeader.js"),
      "utf8"
    ),
  },
});
