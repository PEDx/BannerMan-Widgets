import resolve from 'rollup-plugin-node-resolve'; // 告诉 Rollup 如何查找外部模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import filesize from 'rollup-plugin-filesize';
import vue from 'rollup-plugin-vue'; // 处理vue文件
import babel from 'rollup-plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import css from 'rollup-plugin-css-only'; // 提取css，压缩能力不行
import CleanCSS from 'clean-css'; // 压缩css
import { writeFileSync } from 'fs'; // 写文件

const outputTypes = [{ file: './dist/es/index.js', format: 'es' }];

const tasks = outputTypes.map(output => ({
  input: './src/index.js',
  external,
  filesize,
  output,
  plugins: [
    resolve(),
    filesize(),
    commonjs(),
    css({
      output(style) {
        writeFileSync(
          'dist/vue-rollup-component-template.css',
          new CleanCSS().minify(style).styles,
        );
      },
    }),
    vue({ css: false }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    svg(),
  ],
}));

export default tasks;
