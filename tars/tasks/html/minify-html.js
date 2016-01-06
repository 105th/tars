'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const minifyOpts = {
    conditionals: true,
    quotes: true,
    empty: true
};

/* eslint-disable camelcase */

const prettifyOpts = {
    indent_char: ' ',
    indent_size: 4,
    indent_inner_html: true,
    preserve_newlines: true,
    max_preserve_newlines: 0,
    unformatted: true,
    end_with_newline: true,
    condensed: true,
    padcomments: false
};

/* eslint-enable camelcase */

/**
 * Minify HTML (optional task)
 */
module.exports = function () {
    return gulp.task('html:minify-html', function () {
        return gulp.src('./dev/**/*.html')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while processing compiled html-files.', error);
                    }
                }))
                .pipe(gulpif(
                    tars.config.minifyHtml,
                    tars.require('gulp-minify-html')(minifyOpts),
                    tars.require('gulp-html-prettify')(prettifyOpts)
                ))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    notifier.success('Compiled html\'ve been processed.')
                );
    });
};
