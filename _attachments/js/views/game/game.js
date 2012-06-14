define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/game/game.html'
], function ($, _, backbone, gameTemplate) {
    var view = backbone.View.extend({
        tagName : "li",
        template : _.template(gameTemplate),
        // If there's a change in our model, rerender it
        initialize : function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render : function(){
            var content = this.model.toJSON();
            content.date = new Date(content.date);
            $(this.el).html(this.template(content));
            return this;
        }
    });
    return view;
});
