define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/teams',
    'views/teams/addTeam',
    'text!views/templates/admin/admin.html',
    'text!views/templates/game/addGame.html'
], function ($, _, backbone, teamCollection, addTeamView, adminTemplate, addGameTemplate) {
    var Teams = new teamCollection();
    var view = backbone.View.extend({
        el : $("#content"),
        // If there's a change in our model, rerender it
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
            var view = new addTeamView({collection: Teams});
            view.refreshTeams();
        },
        addGames : function(){
            // reset the table
            $("#content").html("");
            /*$("#content").html(_.template(addGameTemplate, {teams: Teams.toJSON()}));*/
            $("#content").html(Mustache.render(addGameTemplate,{teams: Teams.toJSON()}));
        },
        initialize : function(){
            _.bindAll(this, 'refreshed');
            this.refreshed();
        }
    });
    Teams.fetch();
    return view;
});
