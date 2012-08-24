
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/teams',
    'collections/games',
    'views/admin/adminTeamList',
    'text!views/templates/game/addGame.html'
], function ($, _, backbone, teamCollection, gameCollection, adminTeamList, addGameTemplate) {
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
            var view = new adminTeamList();
            view.refreshed();
            $("#content").append(view.render());
            $('#dp3').datepicker();
            $('.timepicker-default').timepicker();
        },
        initialize : function(){

        },
        onCreateGame : function(){
            var team1Id = $("#team1").val();
            var team2Id = $("#team2").val();
            var team1Name = $("#team1 option:selected").text();
            var team2Name = $("#team2 option:selected").text();
            var gameDate = $("#gamedate").val();
            var gametime = $("#gametime").val();

            // sanitize user input...you never know ;)
            if (team1Id != team2Id){
            Games.create({
                "team1" : team1Name,
                "team2" : team2Name,
                "teamId1" : team1Id,
                "teamId2" : team2Id,
                "date" : gameDate,
                "time" : gametime
            });
            }else{
                alert("Cannot schedule same teams!!");
            }

            this.render();
        }
    });
    Teams.fetch();
    return view;
});
