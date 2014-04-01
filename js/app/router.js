define(function (require) {

    "use strict";



       var NavView =       require("views/nav");
       var ProductView =   require("views/product");
       var CheckinView =   require("views/checkin");
       var CheckoutView = require("views/checkout");
       var InventoryView = require("views/inventory");

       var productCollection = require("models/product");


        var slideOpts = {
            sl:     ['slin',   'slout' ],
            sr:     ['srin',   'srout' ],
            popin:  ['popin',  'noanim'],
            popout: ['noanim', 'popout'],
        };


       return Backbone.Router.extend({
           initialize : function(){

               var app = function(){
                   this.productCollection = new productCollection;

                   this.productCollection.create({productName:'ant'});
                   this.productCollection.create({productName:'clara'});

                   this.views = {
                       "main_nav" :  new NavView({
                           el:"#main_nav"
                       }),
                       "view-product" : new ProductView({
                           el:"#view-product",
                           collection : this.productCollection
                       }),
                       "view-checkin" : new CheckinView({
                           el:"#view-checkin"
                       }),
                       "view-checkout" : new CheckoutView({
                           el: "#view-checkout"
                       }),
                       "view-inventory" : new InventoryView({
                           el:"#view-inventory"
                       })
                   };

                   this.nav = function(viewFrom, viewTo , anim){
//                        console.log(viewFrom);
//                        console.log(viewTo);
//                        console.log(anim);

                        if (viewFrom == viewTo){
                            return ;
                        }else {
                            var vIn = this.views[viewTo].el;
                            var vOut = this.views[viewFrom].el;
                            vOut.classList.remove('active');
                            vIn.classList.add('active');
                            vOut.classList.add('hidden');
                            vIn.classList.remove('hidden');
                            APP.router.navigate("views/"+viewTo);
                        }
                   };

                   this.slide = function(vIn , vOut, slideType, callback){
                        console.log(vIn);
                        console.log(vOut);
                        console.log(slideType);
                        console.log(callback);

                       var onAnimationEnd = function () {
                           vOut.classList.add('hidden');
                           vIn.classList.add('active');
                           vIn.classList.remove(slideOpts[slideType][0]);
                           vOut.classList.remove(slideOpts[slideType][1]);
                           vOut.removeEventListener('webkitAnimationEnd', onAnimationEnd, false);
                           vOut.removeEventListener('animationend',       onAnimationEnd);
                       };

                       vOut.addEventListener('webkitAnimationEnd', onAnimationEnd, false);
                       vOut.addEventListener('animationend',       onAnimationEnd);
                       if (callback && typeof(callback) === 'function') {
                           callback();
                       }
                       vOut.classList.remove('active');
                       vIn.classList.remove('hidden');
                       vIn.classList.add(slideOpts[slideType][0]);
                       vOut.classList.add(slideOpts[slideType][1]);

                   };



               }

               window.APP =  new app();
               APP.router   = this ;
               var fastClick  = require('fastclick/lib/fastclick');
               fastClick.attach(document.body);

           },
           routes: {
               "": "home",
               "views/:viewname": "view",
               ":viewname/*other" : "go"

           },
           home : function(){


               this.navigate("views/view-checkin");
           },
           view : function(viewname){
                console.log(viewname + " is the active view!");
           },
           go: function(viewname, other){
               console.log(viewname);
               console.log(other);
           }

       });
//        PageSlider  = require('app/utils/pageslider'),
//        HomeView    = require('app/views/Home')
//
//        slider = new PageSlider($('body')),
//
//        homeView = new HomeView();
//
//    return Backbone.Router.extend({
//
//        routes: {
//            "": "home",
//            "employees/:id": "employeeDetails",
//            "employees/:id/reports": "reports"
//        },
//
//        home: function () {
//            homeView.delegateEvents();
//            slider.slidePage(homeView.$el);
//        },
//
//        employeeDetails: function (id) {
//            require(["app/models/employee", "app/views/Employee"], function (models, EmployeeView) {
//                var employee = new models.Employee({id: id});
//                employee.fetch({
//                    success: function (data) {
//                        slider.slidePage(new EmployeeView({model: data}).$el);
//                    }
//                });
//            });
//        },
//
//        reports: function (id) {
//            require(["app/models/employee", "app/views/Reports"], function (models, ReportsView) {
//                var employee = new models.Employee({id: id});
//                employee.fetch({
//                    success: function (data) {
//                        slider.slidePage(new ReportsView({model: data}).$el);
//                    }
//                });
//            });
//        }
//
//    });

});