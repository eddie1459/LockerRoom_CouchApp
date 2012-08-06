define([
    'Underscore',
    'Backbone',
    'models/message'
], function (_, backbone, messageModel) {
    return backbone.Collection.extend({
        url: "/messages",
        model: messageModel,
        comparator : function(message){
            return message.get("date");
        }
    });
});
