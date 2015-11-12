$(document).ready (function() {


  $("a").on("click", function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    href = href.substr(1);
    router.navigate(href, {trigger:true});
  });


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

  validate: function (attrs) {
      if (!attrs.Lname) {
        return "Last name is required";
      }
      if (typeof attrs.Lname !== "string") {
        return "Last name must a string";
      }
      if (!attrs.Fname) {
        return "First name is required";
      }
      if (typeof attrs.Fname !== "string") {
        return "First name must a string";
      }
      if (!attrs.email) {
        return "Email is required";
      }
      if (typeof attrs.email !== "string") {
        return "Email must a string";
      }
       if (!attrs.Phone) {
        return "Phone is required";
      }
      if (typeof attrs.Phone !== "string") {
        return "Phone must a string";
      }
      if (!attrs.City_State) {
        return "City and State are required";
      }
      if (typeof attrs.City_State !== "string") {
        return "City and State must a string";
      }
  },
    _parse_class_name: "Lname",
    idAttribute: "objectId"
  });

  var Router = Backbone.Router.extend({
    initialize: function () {
      Backbone.history.start({pushState: true});
  },
    routes: {
      "List": "List",
      "Single": "Single",
      "": ":index"
  }
  });

  var router = new Router();
  router.on("route:List", function(objectId) {
    var Lname = new LastName({objectId: objectId});
    LastName.fetch();
    console.log(LastName);
  });

  router.on("route:List", function (){
    console.log("List View Page");
  });

  router.on("route:Single", function () {
    console.log("Single View Page");
  });

  var newLname = new Lname({
    Fname: "Michael",
    Lname: "Sweeney",
    email: "mike@theironyard.com",
    Phone: "666-666-6666",
    City_State: "Las Vegas, NV"
  });

  var names = Backbone.Collection.extend({
    model: Lname,
    _parse_class_name: "Lname"
  });

  var nameCollection = new names();

nameCollection.fetch({
  success: function(resp) {
    var dataObj = {'data': resp.toJSON()};
    var simpleTemplate = $("#theListTemplate").text();
    var theHTML = Mustache.render(simpleTemplate, dataObj);
    $("#listTemplate").html(theHTML);

    var singleTemplate = $("#theSingleTemplate").text();
    var theHTML = Mustache.render(simpleTemplate, dataObj);
    $("#singleTemplate").html(theHTML);

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