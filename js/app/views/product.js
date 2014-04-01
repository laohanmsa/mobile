define(function(require){

    var productDetailView = Backbone.View.extend({
        tagName : 'section',
        className : 'hidden',
        template : _.template($('#product_detail_template').html()),
        events: {
            "click header .left" : "back"

        },
        initialize: function(){



        },
        back : function(event){
            console.log(event);
        },
        render: function(){

            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

    });

    var productItemView = Backbone.View.extend({

        tagName : "li",
        className : "product-item",
        template : _.template($('#product_item_template').html()),
        render : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events:{
            "click" : "detail"
 // disable touch handlers for now ;
//            "touchstart": "touchstart",
//            "touchmove": "touchmove",
//            "touchend":"touchend",
//            "touchcancel":"touchend"

        },
        detail:function(event){
            console.log(this.model);
            var detailView = this.getDetailView();
            detailView.model = this.model;
            detailView.render();

            APP.slide(detailView.el, APP.views["view-product"].el,  "sl" ,function(){
                console.log('slide over ')
            });
            // or we can us deferr ?
//                .start(function(){})
//                .done(function(){});



           // console.log(event);
        },

        getDetailView: function(){
            APP.productDetailView = APP.productDetailView || this.createDetailView();
            return APP.productDetailView;
        },

       createDetailView : function(){
           var view  = new productDetailView();
           view.$el.appendTo(document.body);
           return view;
       },

        getOrgEvent: function(event){
            return event.originalEvent || event || {};
        },

        touchstart: function(event){
            console.log('touch start');
            event = this.getOrgEvent(event);
            this.tracking = true;
            this.startX = event.pageX;
            this.startY = event.pageY;
            this.shiftX = 0 ;
            this.shiftY = 0 ;
            console.log(event.pageX);
        },
        touchmove: function(event){

            if (this.tracking){
                event = this.getOrgEvent(event);
                console.log('touchmove');
                               this.shiftX = event.pageX-this.startX;
                this.shiftY = event.pageY-this.startY;
                console.log(this.shiftX);
                if(this.shiftX >=300){
                    console.log('swept right');
                }else if(this.shiftX <= -300){
                    console.log('swept left');
                }else{

                }
                return true;
            }
        },
        touchend: function(event){

            this.tracking = false;
            this.shiftX = 0 ;
            this.shiftY = 0 ;
        }





    });

    var productView = Backbone.View.extend({
        initialize: function(){
            console.log('in product view');

            this.listenTo(this.collection, 'reset', this.render );
            this.listContainer = this.$('.product-list');
            this.listContainer.html('');
            this.collection.fetch({reset: true});

        },

        events: {

        },

        render : function(event){
            console.log(event)
            var container = this.listContainer;
            this.collection.each(function(productModel){
                  var item = new productItemView({
                      model : productModel
                  });

                  container.append(item.render().el);
            });

            return this;
        }





    });
    return productView;
});