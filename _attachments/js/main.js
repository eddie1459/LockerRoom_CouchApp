require.config({
    paths: {
        jQuery: 'libs/jquery/jquery',
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone'
    }
});

require([
    'app',
    'order!libs/jquery/jquery-min',
    'order!libs/mustache/mustache-min',
    'order!libs/jquery_couch/jquery.couch',
    'order!libs/underscore/underscore-min',
    'order!libs/backbone/backbone-min',
    'order!libs/backbone_couchdb/backbone-couchdbmin'
], function(app) {
    app.initialize();
});
