define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/messages',
    'views/message/message',
    'text!views/templates/message/addMessage.html'
], function ($, _, backbone, messageCollection, messageView, messageAddTemplate) {
    var Messages = new messageCollection();
    var globalGameId;
    var filteredCollection;
    var logView = backbone.View.extend({
        el: $("#content"),
        events : {
            "click #createMsg" : "onCreateMessage"
        },
        initialize : function(gameId){
            globalGameId = gameId;
            this.getNewMessages();
            //not sure we want this yet, could be a surprise to someone
            //typing in comments
            //Messages.bind("add", this.getLatestMessage);
            this.refreshed();
        },
        /*getLatestMessage : function() {
            var view = new messageView({model: filteredCollection.last()});
            var rendered = view.render().$el;
            $("#content").append(rendered);
        },*/
        getNewMessages : function (){
            var newModels = Messages.filter(function(message) {
                return message.get('gameId') === globalGameId;
            });
            filteredCollection = new messageCollection(newModels);
        },
        refreshed : function(){
            $("#content").html("");
            if(filteredCollection.length > 0){
                // add each element
                filteredCollection.each(this.addRow);
            }
            $("#content").append(_.template(messageAddTemplate));
        },
        // Prepends an entry row
        addRow : function(message){
            var view = new messageView({model: message});
            var rendered = view.render().$el;
            $("#content").append(rendered);
        },
        onCreateMessage : function(){
            var msg = Messages.create({
                "gameId" : globalGameId,
                "message" : $("#message").val(),
                "date" : new Date().getTime()
            });
            filteredCollection.add(msg);
            this.refreshed();
        }
    });
    Messages.fetch();
    return logView;
});