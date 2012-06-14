define([
    'jQuery',
    'Underscore',
    'Backbone',
    'router'
], function ($, _, backbone, router) {

    var initialize = function() {
        router.initialize();
    };

    return {
        initialize: initialize
    };
});
