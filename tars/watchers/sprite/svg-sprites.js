'use strict';

/**
 * Watcher for images for sprite (svg)
 */
module.exports = () => {
    if (tars.config.useSVG) {
        return tars.packages.chokidar.watch(
            'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/svg/**/*.svg',
            {
                ignored: '',
                persistent: true,
                ignoreInitial: true
            }
        ).on('all', (event, path) => {
            tars.helpers.watcherLog(event, path);
            tars.packages.gulp.start('svg-actions');
        });
    } else {
        return false;
    }
};
