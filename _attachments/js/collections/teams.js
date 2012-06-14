define([
    'Backbone',
    'models/team'
], function (backbone, teamModel) {
    return backbone.Collection.extend({
        url: "/teams",
        model: teamModel,
        comparator : function(team){
            return team.get("date");
        }
    });
});
