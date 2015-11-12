  
var Contact = Backbone.Model.extend({
  initialize: function () {
    console.log("A new contact is added to the list");
  },
  defaults: {
    name: null,
    eMail: null,
    phoneNumber: null,
    city: null
  },
  validate: function (attrs) {
    if (!attrs.name) {
      return "Name is required";
    }
    if (!attrs.eMail) {
      return "E-mail is required";
    }
    if (typeof attrs.name !== 'string') {
      return "Name must be a string";
    }
    if (typeof attrs.eMail !== 'string') {
      return "E-mail must be a string";
    }
    if (!attrs.phoneNumber) {
      return " Phone number  is required";
    }
    if (isNaN(Number(attrs.phoneNumber))) {
      return "Phone number should be a number";
    }
    if (!attrs.city){
      return "City is required"
    }
    if (typeof attrs.city !== 'string') {
      return "City must be a string";
    }
  },
  _parse_class_name: "Contact", // november 11 class//
  idAttribute:"objectId"
});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  _parse_class_name: "Contact"
});

var contactsCollection = new Contacts();
contactsCollection.fetch({
  success: function(resp){
    var dataBase = {"Contact": resp.toJSON()};
    var template = $("#testTemplate").text();
    var info = Mustache.render(template, dataBase);
    $("#listContact").html(info);

    makeRoutes();


  }, error: function (err){
    console.log("error:", err);
  }
});


var contacts = Backbone.Collection.extend({
  model: Contact
});

var Router = Backbone.Router.extend({
    initialize: function (){
      Backbone.history.start({ pushState: true});
    },

    routes: {
      "contact/:objectId": "contact",
      "name": "name",
      "eMail": "eMail",
      "phoneNumber": "phoneNumber",
      "city": "city",
      "": "index"
    }

  });

function makeRoutes() {
  
  var router = new Router();
  router.on("route:contact", function(objectId){
    var contact = new Contact({
      objectId: objectId});
    contact.fetch();
    console.log(contact);
  });


  $("a").on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href, {trigger:true}); // november 11 class//
  });
}



