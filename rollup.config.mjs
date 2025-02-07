import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.jsx", // File đầu vào
  output: [
    {
      file: "dist/index.js",
      format: "cjs", // CommonJS
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm", // ES Module
      exports: "named",
    },
  ],
  external: ["react", "react-dom"], // Không đóng gói React
  plugins: [
    resolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    postcss({
      extract: true,
      minimize: true,
      modules: false,
    }),
  ],
};
