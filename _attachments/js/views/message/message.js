define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/message/message.html'
], function ($, _, backbone, messageTemplate) {
    var view = backbone.View.extend({
        template : _.template(messageTemplate),
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
            content.time = this.getTime(currentDt);
            $(this.el).html(this.template(content));
            return this;
        },
        getTime: function(date) {
            var a_p = "";
            var curr_hour = date.getHours();

            if (curr_hour < 12)
            {
                a_p = "AM";
            }
            else
            {
                a_p = "PM";
            }
            if (curr_hour == 0)
            {
                curr_hour = 12;
            }
            if (curr_hour > 12)
            {
                curr_hour = curr_hour - 12;
            }

            var curr_min = date.getMinutes();
            var timeToret = curr_hour + ":" + curr_min + " " + a_p;
            return timeToret;
        }
    });
    return view;
});
