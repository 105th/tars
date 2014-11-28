var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var mkdirp = require('mkdirp');
var fs = require('fs');
var projectConfig = require('../../../projectConfig');

var paths = [
            'markup/' + projectConfig.fs.staticFolderName + '/js/libraries',
            'markup/' + projectConfig.fs.staticFolderName + '/js/plugins',
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName,
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content',
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins',
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite'
        ];

    for (var i = 0; i < projectConfig.useImagesForDisplayWithDpi.length; i++) {
        paths.push('markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite/' + projectConfig.useImagesForDisplayWithDpi[i] + 'dpi');
    }

    paths.push(
        'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg',
        'markup/' + projectConfig.fs.staticFolderName + '/fonts',
        'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.cssPreprocessor,
        'markup/modules/_template/assets',
        'markup/modules/_template/ie'
    );

/**
 * Create fs for project
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('create-fs', function(cb) {

        if (projectConfig.fs.staticFolderName != 'static') {
            fs.renameSync('./markup/static/', './markup/' + projectConfig.fs.staticFolderName);
        }

        paths.forEach(function(path) {
            mkdirp(path, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });

        cb(null);
    });
};