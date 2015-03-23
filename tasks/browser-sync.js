/*
 * grunt-browser-sync
 * https://github.com/shakyshane/grunt-browser-sync
 *
 * Copyright (c) 2013 Shane Osbourne
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var instance, bs;

    grunt.registerMultiTask("browserSync", "Keep your browsers in sync", function () {

        var done = this.async();

        var options = this.options({
            keepalive: true
        });

        var patterns;

        if (this.data && this.data.bsFiles && this.data.bsFiles.src) {
            patterns = this.data.bsFiles.src;
            if (typeof patterns === "string") {
                patterns = [patterns];
            }
        }

        if (!patterns) {
            if (this.data.src) {
                patterns = this.data.src;
                if (typeof this.data.src === "string") {
                    patterns = [this.data.src];
                }
            }
        }

        if (!patterns) {
            if (this.filesSrc.length) {
                patterns = this.filesSrc;
            }
        }

        bs = require("browser-sync").create("Grunt");

        bs.init(patterns || [], options, function (err, bs) {
            if (options.watchTask   ||
                options.watchtask   ||
                options.background  ||
                !options.keepalive) {
                instance = bs;
                done();
            }
        });
    });

    grunt.registerMultiTask("bsReload", function () {
        if (bs && bs.active) {
            bs.reload(this.data.reload);
        }
    });

    grunt.registerMultiTask("bsNotify", function () {
        if (bs && bs.active) {
            bs.notify(this.data.notify);
        }
    });
};
