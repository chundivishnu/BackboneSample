var app = (function() {
 
    var api = {
        views: {},
        model: new Backbone.Model(),
        collections: {},
        content: null,
        router: null,
        todos: null,
        changeContent: function(el) {
            this.content.empty().append(el);
            return this;
        },
        title: function(str) {
            $("h1").text(str);
            return this;
        },
        init: function() {
            console.log('dd');
            this.content = $("#content");
            Backbone.history.start();
            return this;
        }
    };
    var ViewsFactory = {
        product: function() {
            api.views.productView = new ProductItemView({
                template: $('#tpl-product').html(),
                model: api.model
            }); 
            this.productView = api.views.productView;
            
            return this.productView;
        },
        address: function() {
             api.views.addressView = new ShippingAddressView({
                template: $('#tpl-address').html(),
                model: api.model
            }); 
            this.addressView = api.views.addressView;
            return this.addressView; 
        },
        confirm: function() {
            api.views.confirmView = new ConfirmView({
                template: $('#tpl-confirm').html(),
                model: api.model
            });
      
            this.confirmView = api.views.confirmView;
            return this.confirmView; 
        }
    };
    var Router = Backbone.Router.extend({
        routes: {
            "": "product",
            "address": "address",
            "address/confirm": "confirm"
        },
        product: function() {
            console.log('ff')
            var view = ViewsFactory.product();
            api.changeContent(view.$el);
            view.render();
        },
        address: function() {
            console.log('22')
            var view = ViewsFactory.address();
            api.changeContent(view.$el);
            view.render();
        },
        confirm: function() {
            console.log('44')
            var view = ViewsFactory.confirm();
            api.changeContent(view.$el);
            view.render();
        }
    });
    api.router = new Router();
    
    var ProductItemView = Backbone.View.extend({
       // template: _.template($("#tpl-menu").html()),
        initialize: function(options) {
            this.render();
            console.log(options);
            this.template = options.template;
            this.model = options.model;
        },
        render: function(){
            this.$el.html(this.template);
        },
        events: {
            'click #checkout': 'onCheckout',
            'click #blue': 'onBlueColorClick',
            'click #white': 'onWhiteColorClick'
        },
        onCheckout: function() {
            var size = this.$('#size').val();
            var qty = this.$('#qty').val();
            if(size != 0 && qty != 0) {
                this.model.set('pName', 'Hugo');
                this.model.set('desc', 'Jason Slim Fit Dress Shirt')
                this.model.set('size', size);
                this.model.set('qty', qty);
                this.model.set('price', 120);
                this.model.set('total', qty*120);
                this.model.set('color', 'white');
                app.router.navigate('/address',{trigger: true});
            } else {
                alert('please select size and quantity!!')
            }
        },
        onBlueColorClick: function(){
            this.$("#my_img").attr("src","img/primg1.jpg");
            this.$("#colorname").text("Light Blue");
            this.model.set('color', 'blue');
        },
        onWhiteColorClick: function(){
            this.$("#my_img").attr("src","img/primg2.jpg");
            this.$("#colorname").text("White");
            this.model.set('color', 'white');
        }
    });

    var ShippingAddressView = Backbone.View.extend({
        initialize: function(options) {
            this.render();
            console.log(options);
            this.template = options.template;
            this.model = options.model;
        },
        render: function(){
            this.$el.html(this.template);
        },
        events: {
            'click #ship': 'onShippingAddressClick'
        },
        onShippingAddressClick: function() {
            console.log('33')
            
    
            var address = this.$('#adr').val();
            if(address.length !== 0) {
                var formdata = this.$('#addressform').serializeArray();
                var that = this;
                _.each(formdata, function(obj) {
                    that.model.set(obj.name, obj.value);
                });
                app.router.navigate('/address/confirm',{trigger: true});
            } else {
                alert('Shipping Address Cannot be Empty')
            }
            
        }
    });
   
    
    
     var ConfirmView = Backbone.View.extend({
        initialize: function(options) {
            this.render();
            console.log(options);
            this.template = options.template;
            this.model = options.model;
        },
        render: function() {
            this.$el.html(this.template);
            JSON.stringify(this.model);
            this.$("#pname").text(this.model.get('pName'));
            this.$("#desc").text(this.model.get('desc'))
            this.$("#size").text(this.model.get('size'));
            this.$("#qty").text(this.model.get('qty'));
            this.$("#price").text(this.model.get('price'));
            this.$("#total").text(this.model.get('total'));
            
            this.$('#name').text(this.model.get('name'));
            this.$('#phone').text(this.model.get('phone'));
            this.$('#address').text(this.model.get('address'));
            this.$('#city').text(this.model.get('city'));
            this.$('#state').text(this.model.get('state'));
            this.$('#zipcode').text(this.model.get('zip'));

        }
    });

    return api;
 
})();