$(document).ready (function() {


  var Lname = Backbone.Model.extend({
    initialize: function () {
      console.log("A new entry has been added.");
  },
    defaults: {
      Lname: null,
      Fname: null,
      email: null,
      Phone: null,
      City_State: null
  },

    _parse_class_name: "Lname",
    idAttribute: "objectId"
  });

  var Router = Backbone.Router.extend({
    initialize: function () {
      Backbone.history.start({pushState: true});
  },
    routes: {
      "person/:objectId": "person",
      "contact": "contact",
      "": ":index"
  }
  });

  var router = new Router();
  router.on("route:person", function(objectId) {
    var person = new Lname({objectId: objectId});
    person.fetch();
    console.log(person);
  });

  router.on("route:contact", function (){
    console.log("contact");
  });

  router.on("route:index", function () {
    console.log("home page");
  });

 /* var newLname = new Lname({
    Fname: "Michael",
    Lname: "Sweeney",
    email: "mike@theironyard.com",
    Phone: "666-666-6666",
    City_State: "Las Vegas, NV"
  });*/


  $("a").on("click", function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    href = href.substr(1);
    router.navigate(href, {trigger:true});
  });

  var Contacts = Backbone.Collection.extend({
    model: Lname,
    _parse_class_name: "Lname"
  });

  var ContactCollection = new Contacts();

ContactCollection.fetch({
  success: function(resp) {
    var dataObj = {'data': resp.toJSON()};
    var simpleTemplate = $("#theListTemplate").text();
    var theHTML = Mustache.render(simpleTemplate, dataObj);
    $("#listTemplate").html(theHTML);


    var singleTemplate = $("#theSingleTemplate").text();
    var theHTML = Mustache.render(simpleTemplate, dataObj);
    $("#singleTemplate").html(theHTML);

    console.log("success: ", resp);
  }, error: function (err) {
    console.log("error: ", err);
  }
});
  

});






    /*console.log(resp.toJSON());
    var listTemplate = $("#listTemplate").text();
    var theHTML = Mustache.render(listTemplate, resp.toJSON());
    $("#listView").html(theHTML);
    var singleTemplate = $("#singleTemplate").text();
    var theHTML = Mustache.render(singleTemplate, resp.toJSON());
    $("#singleView").html(theHTML);*/