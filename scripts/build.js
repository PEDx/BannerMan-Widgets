const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve'); // 告诉 Rollup 如何查找外部模块
const commonjs = require('rollup-plugin-commonjs'); // 将CommonJS模块转换为 ES2015 供 Rollup 处理
const filesize = require('rollup-plugin-filesize');
const vue = require('rollup-plugin-vue'); // 处理vue文件
const babel = require('rollup-plugin-babel'); // rollup 的 babel 插件，ES6转ES5
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const replace = require('rollup-plugin-replace');
const path = require('path');
const rimraf = require('rimraf');
// see below for details on the options
const package_path = '../packages';

const inputOptions = src_dir => ({
  input: path.resolve(src_dir, 'index.js'),
  external: ['vue'],
  plugins: [
    resolve({
      extensions: ['.js', '.vue', '.json'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('develop'),
      'process.env.VUE_ENV': JSON.stringify('browser'),
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

    terser(), //js压缩
  ],
});
const outputOptions = dest_dir => ({
  dir: path.resolve(src_dir, dest_dir),
  name: 'index',
  file: 'index.js',
  format: 'umd',
});

async function rollupBuild(src_dir, dest_dir) {
  rimraf.sync(dest_dir);
  // create a bundle
  const bundle = await rollup.rollup(inputOptions(src_dir));

  // or write the bundle to disk
  await bundle.write(outputOptions(src_dir, dest_dir));
}

// module.exports = rollupBuild;
console.log(path.resolve('package'));
