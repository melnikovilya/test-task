const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist'])
}

const styles = () => {
    return src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('css/style.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
            'src/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('js/main.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/**/*.jpeg',
        'src/img/*.svg',
        ])
        .pipe(image())
        .pipe(dest('dist/img'))
}

const fonts = () => {
    return src([
        'src/fonts/**/*.woff',
        'src/fonts/**/*.woff2'
        ])
        .pipe(dest('dist/fonts'))
}

const video = () => {
    return src([
        'src/video/**/*.mp4'
        ])
        .pipe(dest('dist/video'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/js/**/.js', scripts)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlMinify, scripts, styles, images, fonts, video, watchFiles)
