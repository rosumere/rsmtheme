const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const gulpif = require("gulp-if");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const destFolder = 'assets';
let isProd = false;

/**
 * Main styles task
 */
function mainStyles() {
  return src('_src/sass/style.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(isProd, gcmq()))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest(destFolder + '/css'))
    .pipe(browserSync.stream());
}
exports.mainStyles = mainStyles;

/**
 * Main scripts task
 */
function mainScripts() {
  return src('_src/js/main.js')
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest(destFolder + '/js'))
}
exports.mainScripts = mainScripts;

/**
 * Watching task
 */

function watching() {
  watch('_src/sass/**/*.scss', parallel(mainStyles));
  watch('_src/js/main.js', parallel(mainScripts));
}
exports.watching = watching;


exports.default = parallel(
  mainStyles,
  mainScripts,
  watching
);
