//Model
    
var Contacts = Backbone.Model.extend({
  initialize: function () {
    console.log("Contact List");
  },
  defaults: {
    name: null,
    phone: null,
    email: null
  },
  validate: function (attrs) {
    if (!attrs.name) {
      return "Name is required";
    }
     if (!attrs.phone) {
      return "Phone number is required"; 
     }
      if (!attrs.email) {
      return "Email is required"; 
     }
    if (typeof attrs.name !== 'string') {
        return "Name must be a string";
      }
      if (typeof attrs.phone !== 'string') {
        return "Phone must be a string";
    }
      if (typeof attrs.email !== 'string') {
        return "Email must be a string";
    }
  },
  _parse_class_name: "Contacts"
});

var contact = new Contacts({
    name: "Mike Sweeney",
    Phone: "702-544-8525",
    email: "mike.sweeney@theironyard.com"
});

    
var Contacts = Backbone.Collection.extend({
  model: Contacts,
  _parse_class_name: "Contacts"
});

var ContactsCollections = new Contacts();

    ContactsCollections.fetch({
      success: function(response) {
        console.log("success: ", response);
          
          var parseModel = {
              listData: response.models
          };
         var dataText = $("#dataList").text();
          var dataRender = Mustache.render(dataText, parseModel);
          $("#contactDiv").html(dataRender); 
      }, error: function (err) {
        console.log("error: ", err);
      },
    
  error: function (err) {
    console.log(err)
  }
});


var Router = Backbone.Router.extend({
    initialize: function () {
        Backbone.history.start({pushState: true});
    },
    routes: {
        "": "index",
        "name": "name",
        "phone": "phone",
        "email": "email",
        "location": "location"
    }
});

var router = new Router();

router.on('route:index', function() {
    console.log("Home Page");
});

router.on('route:name', function (objectId) {
    var person = new Contacts ({objectId : objectId});
    person.fetch({});
    console.log("Name");
});



$("a").on('click', "a", function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href, {trigger:true});
});








