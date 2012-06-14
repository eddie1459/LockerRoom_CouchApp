define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/main/display'
], function ($, _, backbone, mainView) {
    var appRouter = backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        },
        defaultAction: function () {
            mainView.render();
        }
    });

    var initialize = function () {
        var app_router = new appRouter;
        backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
