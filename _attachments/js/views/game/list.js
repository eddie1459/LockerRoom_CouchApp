define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/game/game',
    'collections/games'
], function ($, _, backbone, gameView, gameCollection) {
    var Games = new gameCollection();
    var GameView = backbone.View.extend({
        el: $("#content"),
        initialize : function(teamId){
            _.bindAll(this, 'refreshed', 'addRow');
            Games.bind("addToList", this.addRow);
            Games.bind("reset", this.refreshed);
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
            if(Games.length > 0){
                // add each element
                Games.each(this.addRow);
            }
        }
    });
    Games.fetch();
    return GameView;
});
