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
            "click #createMsg" : "onCreateMessage",
            "keyup #message" : "checkFilled"
        },
        checkFilled : function() {
            var filled = 0
            var x = $("#message").val();
            x = x.replace(/^\s+/,""); // strip leading spaces
            if (x.length > 0) {filled ++}

            if (filled == 1) {
                $('#createMsg').removeAttr("disabled");
            }
            else
            {
                $('#createMsg').attr('disabled', "disabled");
            } // in case a field is filled then erased
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
            this.getNewMessages();
            $("#content").html("");
            if(filteredCollection.length > 0){
                // add each element
                filteredCollection.each(this.addRow);
            }
            $("#content").append(_.template(messageAddTemplate));
            $('#createMsg').attr('disabled', "disabled");
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
            this.refreshed();
        }
    });
    Messages.fetch();
    return logView;
});