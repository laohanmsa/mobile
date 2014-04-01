define(function(require){
    "use strict";
     var product = Backbone.Model.extend({
         defaults: {
             productName : '',
             barcode: "009",
             productType:"ex-234",
             unit: '个',
             unitPrice: '1',
             createAt : new Date().toISOString(),
             desc: '请添加产品描述'

         }
     });

     var productCollection = Backbone.Collection.extend({

         localStorage : new Backbone.LocalStorage("productCollection"),
         model :  product
     });

    return productCollection;

});