define(['order!libs/backbone/backbone-min'], function () {
    // noConflict() removes them from the global name space
    _.noConflict();
    $.noConflict();
    return Backbone.noConflict();
});