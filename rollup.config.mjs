import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

export default {
   input: 'example/App.jsx',
   external: [
      'react',
   ],
   output: {
      file: 'example/index.js',
      format: 'umd',
   },
   plugins: [
      nodeResolve({
         extensions: ['.js', '.jsx'],
      }),
      babel({
         compact: false,
         babelHelpers: 'bundled',
         extensions: ['.js', '.jsx'],
         presets: ["@babel/preset-react"],
      }),
      commonjs(),
      replace({
         preventAssignment: false,
         'process.env.NODE_ENV': '"production"',
      }),
   ]
}