var gulp = require('gulp');
var tarsConfig = require('../../../tars-сonfig');
var gutil = require('gulp-util');

require('./remove-init-fs')();
require('./init')();

/**
 * Re-init builder
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('re-init', ['remove-init-fs'], function() {
        gulp.start('init');
    });
};