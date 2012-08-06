define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/teams/addTeam',
    'views/game/addGame',
    'text!views/templates/admin/admin.html'
], function ($, _, backbone, addTeamView, addGameView, adminTemplate) {

    var view = backbone.View.extend({
        el : $("#content"),
        events : {
            /*"click #send" : "onSubmit",*/
            "click #addTeams": "addTeams",
            "click #addGames": "addGames"
        },
        template : _.template(adminTemplate),
        refreshed : function(){
            $("#content").html("");
            $("#content").append(this.template);
        },
        addTeams : function(){
            var view = new addTeamView();
            view.render();
        },
        addGames : function(){
            // reset the table
            /*$("#content").html("");
            $("#content").html(Mustache.render(addGameTemplate,{teams: Teams.toJSON()}));*/
            var view = new addGameView();
            view.render();
        },
        initialize : function(){
            _.bindAll(this, 'refreshed');
            this.refreshed();
        }
    });

    return view;
});
