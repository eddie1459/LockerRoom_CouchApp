
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/teams',
    'collections/games',
    'text!views/templates/game/addGame.html'
], function ($, _, backbone, teamCollection, gameCollection, addGameTemplate) {
    var Teams = new teamCollection();
    var Games = new gameCollection();
    var view = backbone.View.extend({
        el : $("#content"),
        // If there's a change in our model, rerender it
        events : {
            "click #createGame" : "onCreateGame"
        },

        render : function(){
            // reset the table
            $("#content").html("");
            $("#content").html(Mustache.render(addGameTemplate,{teams: Teams.toJSON()}));
        },
        initialize : function(){
        },
        onCreateGame : function(){
            var team1Id = $("#team1").val();
            var team2Id = $("#team2").val();
            var team1Name = $("#team1 option:selected").text();
            var team2Name = $("#team2 option:selected").text();

            // sanitize user input...you never know ;)
            Games.create({
                "team1" : team1Name,
                "team2" : team2Name,
                "teamId1" : team1Id,
                "teamId2" : team2Id,
                "date" : new Date().getTime()
            });
            this.render();
        }
    });
    Teams.fetch();
    return view;
});
