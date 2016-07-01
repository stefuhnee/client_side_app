const gulp = require('gulp');
const mocha = require('gulp-mocha');
const del = require('del');
const webpack = require('webpack-stream');
const lint = require('gulp-eslint');
const opts = {
  'extends': 'eslint:recommended',
  'ecmaFeatures': {
    'modules': true
  },
  'rules': {
    'no-alert': 0,
    'no-bitwise': 0,
    'camelcase': 1,
    'no-console': 1,
    'curly': 1,
    'eqeqeq': 0,
    'no-eq-null': 0,
    'guard-for-in': 1,
    'no-empty': 1,
    'no-use-before-define': 0,
    'no-obj-calls': 2,
    'no-unused-vars': 0,
    'new-cap': 1,
    'no-shadow': 0,
    'strict': 1,
    'no-invalid-regexp': 2,
    'comma-dangle': 2,
    'no-undef': 1,
    'no-new': 1,
    'no-extra-semi': 1,
    'no-debugger': 2,
    'no-caller': 1,
    'semi': 1,
    'quotes': 0,
    'no-unreachable': 2
  },
  'globals': {
    '$': false
  },
  'env': {
    'node': true,
    'es6': true
  }
};

const paths = {
  html: './app/**/*.html',
  js: './app/js/client.js',
  css: './app/css/style.css',
  tests: './test/front-end-test.js'
};

gulp.task('linter', () => {
  return gulp.src(['./*.js', './model/*.js', './route/*.js', './test/*.js', './lib/*.js',
  './app/**/*.js'])
    .pipe(lint(opts))
    .pipe(lint.format());
});

gulp.task('tests', () => {
  return gulp.src(['./test/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('bundle', ['clean'], () => {
  return gulp.src(paths.js)
    .pipe(webpack({output:{filename: 'bundle.js'}}))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('copy', ['clean'],() => {
  gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
  gulp.src(paths.css)
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(paths.tests)
    .pipe(webpack({
      output: {
        filename: 'test-bundle.js'
      }, module: {
        loaders: [{
          test: /\.html$/,
          loader: 'html'
        }]
      }
    })).pipe(gulp.dest('./test'));
});

gulp.task('default', ['linter', 'bundle', 'clean', 'copy'], () => {
});
