define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/game/gameLog',
    'text!views/templates/game/game.html'
], function ($, _, backbone, logView, gameTemplate) {
    var view = backbone.View.extend({
        template : _.template(gameTemplate),
        events : {
            'click #game': 'showGameLog'
        },
        // If there's a change in our model, rerender it
        initialize : function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render : function(){
            var content = this.model.toJSON();
            var currentDt = new Date(content.date);
            var mm = currentDt.getMonth() + 1;
            var dd = currentDt.getDate();
            var yyyy = currentDt.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;
            content.date = date;
            $(this.el).html(this.template(content));
            return this;
        },
        showGameLog : function(){
            var view = new logView(this.model.id);
        }
    });
    return view;
});
