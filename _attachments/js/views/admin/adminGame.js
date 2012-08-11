define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/game/gameLog',
    'text!views/templates/admin/gameAdmin.html'
], function ($, _, backbone, logView, gameTemplate) {
    var view = backbone.View.extend({
        template : _.template(gameTemplate),
        events : {
            'click #game': 'showGameLog',
            'click #delete': 'deleteGame'
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
        },
        deleteGame : function(e){
            if(this.model)
                this.model.destroy();
            $(this.el).fadeOut("fast",function(){
                $(this).remove();
            });
        }
    });
    return view;
});
