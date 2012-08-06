define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/teams',
    'views/teams/editTeam',
    'text!views/templates/teams/addTeam.html'
], function ($, _, backbone, teamCollection, teamView, addTeamTemplate) {
    var Teams = new teamCollection();
    var view = backbone.View.extend({
        // If there's a change in our model, rerender it
        el: $("#content"),
        className : "nav nav-tabs nav-stacked",
        events : {
            "click #send" : "onSubmit"
        },
        /*template: _.template(addTeamTemplate),*/
        // Prepends an entry row
        addNew : function(team){
            var view = new teamView({model: team});
            var rendered = view.render().$el;
            /*this.$el.prepend(rendered);*/
            $("#content").append(rendered);
        },
        refreshTeams : function(){
            $("#content").html("");
            if(Teams.length > 0){
                // add each element
                Teams.each(this.addNew);
            }
            $("#content").append(_.template(addTeamTemplate));
        },
        render : function(){
            this.refreshTeams();
            return this;
        },
        initialize : function(){
        },
        // Simply takes the vals from the input fields and
        // creates a new Team.
        onSubmit : function(){
            var name = $("#name").val();
            // sanitize user input...you never know ;)
            name = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
            Teams.create({
                "name" : name,
                "date" : new Date().getTime()
            });
            this.refreshTeams();
        }
    });
    Teams.fetch();
    return view;
});
