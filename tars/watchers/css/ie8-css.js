'use strict';

const watcherLog = tars.helpers.watcherLog;

/**
 * Watcher for ie8 stylies
 */
module.exports = () => {
    if (tars.flags.ie8 || tars.flags.ie) {
        return tars.packages.chokidar.watch(
            [
                'markup/modules/**/ie8.' + tars.cssPreproc.ext,
                'markup/modules/**/ie8.css'
            ], {
                ignored: '',
                persistent: true,
                ignoreInitial: true
            }).on('all', (event, path) => {
                watcherLog(event, path);
                tars.packages.gulp.start('css:compile-css-for-ie8');
            });
    } else {
        return false;
    }
};
