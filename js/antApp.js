require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../app/tpl',
        models: '../app/models',
        views:'../app/views',
        util:'../app/utils'



    },

    map: {
        '*': {
            'app/models/employee': 'app/models/memory/employee',
            'models/product' : 'models/local/product'

        }
    }


});

require(['app/router'], function(Router){
    var router = new Router();
    Backbone.history.start();
});


//
//require(['jquery', 'underscore','backbone', 'app/router'], function ($,_, Backbone, Router) {
//
//    console.log($);
//    console.log(Backbone);
//    console.log(_);
//    console.log(Router);
//     var router = new Router();
////
////    $("body").on("click", ".back-button", function (event) {
////        event.preventDefault();
////        window.history.back();
////    });
////
//       Backbone.history.start();
//});