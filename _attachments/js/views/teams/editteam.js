define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/teams/edit.html'
], function ($, _, backbone, teamTemplate) {
    var view = backbone.View.extend({
        tagName : "li",
        events : {
            "click .delete" : "deleteMe"
        },
        template : _.template(teamTemplate),
        // If there's a change in our model, rerender it
        initialize : function(){
            _.bindAll(this, 'render', 'deleteMe');
            this.model.bind('change', this.render);
        },
        deleteMe : function(){
            if(this.model)
                this.model.destroy();
            $(this.el).fadeOut("fast",function(){
                $(this).remove();
           });
        },
        render : function(){
            var content = this.model.toJSON();
            $(this.el).html(this.template(content));
            return this;
        }
    });
    return view;
});
