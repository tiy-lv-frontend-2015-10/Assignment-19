$('body').on('click','a', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true});

});

var Contact = Backbone.Model.extend({
  initialize: function() {
    },
    defaults: {
      first: null,
      last: null,
      email: null,
      phone: null,
      location: null
    },
   Model: Contact,
  _parse_class_name: "Contact"
});

var Contacts = Backbone.Collection.extend({
  Model: Contact,
  _parse_class_name: "Contact"
});

var ContactsCollection = new Contacts();

ContactsCollection.fetch({
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var contactTemplate = $("#contactTemplate").text();
    var contactHTML = Mustache.render(contactTemplate, dataObj);
    $("#contactList").html(contactHTML);

    var data2obj = {"data": resp.toJSON()};
    var nameTemplate = $("#nameTemplate").text();
    var nameHTML = Mustache.render(nameTemplate, data2obj);
    $("#contacts").html(nameHTML);

    console.log("success: ", resp);
  }, error: function (err) {
    console.log("error: ", err);
  }
});

var Router = Backbone.Router.extend({
  initialize: function() {
    Backbone.history.start({pushState: true});
  },
  routes: {
    "name/:objectId": "name",
    "": "index"
  }
});

var router = new Router();

router.on('route:name', function(objectId) {
  var name = new Contact({objectId: objectId});
  name.fetch();
  console.log(name);
});


