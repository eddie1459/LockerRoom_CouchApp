define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/teams/list.html'
], function ($, _, backbone, teamTemplate) {
    var view = backbone.View.extend({
        tagName : "li",
        template : _.template(teamTemplate),
        // If there's a change in our model, rerender it
        initialize : function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render : function(){
            var content = this.model.toJSON();
            this.id = this.model.get('_id');
            $(this.el).attr('id', this.id).html(this.template(content));
            return this;
        }
    });
    return view;
});
