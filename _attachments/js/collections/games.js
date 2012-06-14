define([
    'Backbone',
    'models/game'
], function (backbone, gameModel) {
    return backbone.Collection.extend({
        url: "/games",
        model: gameModel,
        comparator : function(game){
            return game.get("date");
        }
    });
});
