const gulp = require('gulp');
const mocha = require('gulp-mocha');
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


gulp.task('linter', () => {
  return gulp.src(['./*.js', './model/*.js', './route/*.js', './test/*.js', './lib/*.js'])
    .pipe(lint(opts))
    .pipe(lint.format());
});

gulp.task('tests', () => {
  return gulp.src(['./test/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('copy', () => {
  return gulp.src(__dirname + '/app/index.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('bundle', () => {
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/controller-test.js')
    .pipe(webpack({
      output: {
        filename: 'test-bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/test'));
});


gulp.task('watch', () => {
  gulp.watch(['./*.js', './model/*.js', './route/*.js', './test/*.js', './lib/*.js'], ['linter', 'tests']);
});

gulp.task('default', ['linter', 'bundle', 'copy'], () => {
});
