define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/teams',
    'views/teams/editteam',
    'text!views/templates/admin/admin.html',
    'text!views/templates/teams/addTeam.html',
    'text!views/templates/game/addGame.html'
], function ($, _, backbone, teamCollection, teamView, adminTemplate, addTeamTemplate, addGameTemplate) {
    var Teams = new teamCollection();
    var view = backbone.View.extend({
        el : $("#content"),
        // If there's a change in our model, rerender it
        events : {
            "click #send" : "onSubmit",
            "click #addTeams": "addTeams",
            "click #addGames": "addGames"
        },
        template : _.template(adminTemplate),
        refreshed : function(){
            $("#content").html("");
            $("#content").append(this.template);
        },
        // Prepends an entry row
        addNew : function(team){
            var view = new teamView({model: team});
            var rendered = view.render().$el;
            this.$el.prepend(rendered);
        },
        addTeams : function(){
            // reset the table
            $("#content").html("");
             if(Teams.length > 0){
             // add each element
             Teams.each(this.addNew);
            }
            $("#content").append(addTeamTemplate);
        },
        addGames : function(){
            // reset the table
            $("#content").html("");

            /*$("#content").html(_.template(addGameTemplate, {teams: Teams.toJSON()}));*/
            $("#content").html(Mustache.render(addGameTemplate,{teams: Teams.toJSON()}));
        },
        initialize : function(){
            _.bindAll(this, 'refreshed', 'addNew');
            Teams.bind("addToAdmin", this.addNew);
        },
        // Simply takes the vals from the input fields and
        // creates a new Team.
        onSubmit : function(){
            var name = $("#content").val();
            // sanitize user input...you never know ;)
            name = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
            Teams.create({
                "name" : name,
                "date" : new Date().getTime()
            });
            this.refreshed();
        }
    });
    Teams.fetch();
    return view;
});
