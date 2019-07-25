import resolve from 'rollup-plugin-node-resolve'; // 告诉 Rollup 如何查找外部模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import filesize from 'rollup-plugin-filesize';
import vue from 'rollup-plugin-vue'; // 处理vue文件
import babel from 'rollup-plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify-es';
const path = require('path');

const outputTypes = [{ file: './dist/index.js', format: 'es' }];

const tasks = outputTypes.map(output => ({
  input: './index.js',
  output,
  plugins: [
    resolve({
      extensions: ['.js', '.vue', '.json'],
      dedupe: ['vue'],
    }),
    filesize(),
    commonjs(),
    postcss({
      extract: true, // 提取 css 为单文件
      minimize: true,
    }),
    vue({ css: false }),
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.NODE_ENV === 'production' ? uglify() : null,
  ],
}));

export default tasks;
