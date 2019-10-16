import resolve from 'rollup-plugin-node-resolve'; // 告诉 Rollup 如何查找外部模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import filesize from 'rollup-plugin-filesize';
import vue from 'rollup-plugin-vue'; // 处理vue文件
import babel from 'rollup-plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify-es';
const path = require('path');

const outputTypes = [
  {
    name: 'index',
    file: './dist/index.js',
    format: 'umd',
    intro: '// BannerMan Widget',
  },
];

const tasks = outputTypes.map(output => ({
  input: './index.js',
  output,
  plugins: [
    resolve({
      extensions: ['.js', '.vue', '.json'],
      dedupe: ['vue'],
    }),
    filesize(), // 统计文件大小
    commonjs(), // 将 CommonJS 模块转换为 ES2015 供 Rollup 处理
    postcss({
      extract: false, // 提取 css 为单文件
      minimize: true,
    }), // 处理 css
    vue({ css: false }), // 处理vue文件
    babel({
      exclude: 'node_modules/**',
    }), // ，ES6转ES5
    {
      name: 'plugin',
      transformBundle(code) {
        console.log('自定义插件');
        return code;
      },
    },
    uglify(), //js压缩
  ],
}));

export default tasks;
