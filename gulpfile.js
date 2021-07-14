
const { src, dest, watch } = require('gulp');

const minifyCss = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");

const sass = gulpSass(nodeSass);

const bundleSass = () => {
    return src('./src/lib-components/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourceMaps.write())
    .pipe(concat('mdui.css'))
    .pipe(dest('./dist/resources/css'));
}

const devWatch = () => {
    watch('./src/lib-components/**/*.scss', bundleSass)
}

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;
