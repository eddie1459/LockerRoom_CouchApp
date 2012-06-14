define([
    'jQuery',
    'Backbone',
    'views/teams/list',
    'views/admin/admin'
], function ($, backbone, teamView, adminView) {
    var mainView = backbone.View.extend({
        el: $("#main"),
        events: {
            'click #admin': 'admin',
            'click #home': 'mainView',
            'click #header': 'mainView'
        },
        initialize: function (){
            new teamView();
        },
        mainView: function (){
            var view = new teamView();
            view.refreshed();
        },
        admin: function () {
            var view = new adminView();
            view.refreshed();
        }
    });
    return new mainView;
});