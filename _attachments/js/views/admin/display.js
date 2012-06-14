define([
    'jQuery',
    'Backbone',
    'views/admin/admin'
], function ($, backbone, editView) {
    var adminView = backbone.View.extend({
        el: $("#main"),
        initialize: function (){
            new editView();
        }
    });
    return new adminView;
});
