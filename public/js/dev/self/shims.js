/**
 * Created by Donghui Huo on 2015/7/16.
 */
module.exports = {
    jquery: {exports: "jQuery"},
    bootstrap: {exports: null, depends: {jquery: "jQuery"}},
    bootstrapdatepicker: {exports: null, depends: {jquery: "jQuery"}},
    bootstrapdatepickerzhcn: {exports: null, depends: {jquery: "jQuery"}},
    imagesLoaded: {
        exports: null, depends: {jquery: "jQuery"}
    },
    masonry: {exports: null, depends: {jquery: "jQuery"}},
    jquerycolorbox: {exports: null, depends: {jquery: "jQuery"}},
    jquerycookie: {exports: null, depends: {jquery: "jQuery"}}
};