define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/game/game',
    'collections/games'
], function ($, _, backbone, gameView, gameCollection) {
    var Games = new gameCollection();
    var filteredCollection;
    var GameView = backbone.View.extend({
        el: $("#content"),
        initialize : function(teamId){
            _.bindAll(this, 'refreshed', 'addRow');
            Games.bind("addToList", this.addRow);
            Games.bind("reset", this.refreshed);
            Games.fetch({data: $.param({teamId1:teamId})});
            var newModels = Games.filter(function(game) {
                return game.get('teamId1') === teamId;
            });
            filteredCollection = new backbone.Collection(newModels);
            this.refreshed();
        },
        // Prepends an entry row
        addRow : function(game){
            var view = new gameView({model: game});
            var rendered = view.render().$el;
            this.$el.prepend(rendered);
        },
        refreshed : function(){
            // reset the table
            $("#content").html("");
            if(filteredCollection.length > 0){
                // add each element
                filteredCollection.each(this.addRow);
            }
        }
    });
    Games.fetch();
    return GameView;
});
