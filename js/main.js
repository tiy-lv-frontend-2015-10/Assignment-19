$(document).ready(function(){
var Contact = Backbone.Model.extend({
  initialize: function () {
  },
  defaults: {
    First: null,
    Last: null,
    Email: null,
    Phone: null,
    Location: null
  },
  _parse_class_name: "Contact",
  idAttribute: "objectId"
});



 var Router = Backbone.Router.extend({
  initialize: function () {
    Backbone.history.start({pushState: true});
  },

  routes: {
    "person/:objectId":"person",
    "contact" : "contact",
    "": "index"
  }

});

var router = new Router();

router.on("route:person", function(objectId) {
  var person = new Contact({objectId: objectId});
  person.fetch();
  console.log(person);
});

router.on("route:contact", function () {
  console.log("contact");
});

router.on("route:index", function () {
  console.log("home page");
});


  $("body").on("click","a", function(e){
  e.preventDefault();
  var href = $(this).attr("href");
  href = href.substr(1);
  router.navigate(href, {trigger:true});
  $("#listView").html("Couldn't figure out how to change templtes");
});

 
var Contacts = Backbone.Collection.extend({
  model: Contact,
  _parse_class_name: "Contact"
});
 var ContactCollection = new Contacts();

    ContactCollection.fetch({
      success: function(resp) {
      var personObj = {"person" : resp.toJSON()};
      var nameTemplate = $("#nameTemplate").text();
      var nameHTML = Mustache.render(nameTemplate, personObj);
        $("#names").html(nameHTML);
          console.log("success: ", resp);
        },error: function (err) {
          console.log("error: ", err);
        }
  });


});

