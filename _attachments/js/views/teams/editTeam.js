define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/teams/editTeam.html'
], function ($, _, backbone, editTeamTemplate) {
    var view = backbone.View.extend({
        id: "teamLineItem",
        tagName: "li",
        template : _.template(editTeamTemplate),
        // If there's a change in our model, rerender it
        events : {
            "click .delete" : "deleteMe"
        },
        deleteMe : function(e){
            if(this.model)
                this.model.destroy();
            $(this.el).fadeOut("fast",function(){
                $(this).remove();
            });
        },
        initialize : function(){
            _.bindAll(this, 'render', 'deleteMe');
            this.model.bind('change', this.render);
        },
        render : function(){
            var content = this.model.toJSON();
            $(this.el).html(this.template(content));
            return this;
        },
        // Simply takes the vals from the input fields and
        // creates a new Team.
        onSubmit : function(){
            var name = $("#name").val();
            // sanitize user input...you never know ;)
            name = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
            this.collection.create({
                "name" : name,
                "date" : new Date().getTime()
            });
        }
    });
    return view;
});

