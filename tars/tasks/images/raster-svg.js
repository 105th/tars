'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const changed = tars.packages.changed;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const imagesPath = tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName;

/**
 * Raster SVG-files (optional task)
 */
module.exports = function () {
    return gulp.task('images:raster-svg', function (cb) {

        if (tars.config.useSVG && (tars.flags.ie8 || tars.flags.ie)) {
            return gulp.src('./markup/' + imagesPath + '/svg/*.svg')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while rastering svg.', error);
                    }
                }))
                .pipe(cache('raster-svg'))
                .pipe(
                    changed(
                        imagesPath + '/rastered-svg-images',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.png'
                        }
                    )
                )
                .pipe(tars.require('gulp-svg2png')())
                .pipe(gulp.dest('./dev/' + imagesPath + '/rastered-svg-images'))
                .pipe(
                    notifier.success('SVG\'ve been rastered')
                );
        } else {
            tars.skipTaskLog('images:raster-svg', 'Rastering SVG is not used');
            cb(null);
        }
    });
};
