define([
    'Underscore',
    'Backbone',
    'models/game'
], function (_, backbone, gameModel) {
    return backbone.Collection.extend({
        url: "/games",
        model: gameModel
    });
});
