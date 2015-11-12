$(document).ready(function(){

  var Person = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {
      name: null,
      email: null,
      phoneNumber: null,
      cityState: null
    },
    validate: function (attrs) {
      if (!attrs.name) {
        return "Name is required";
      }
      if (!attrs.email) {
        return "Email is required";
      }
      if (typeof attrs.name !== 'string') {
        return "Name must be a string";
      }
      if (typeof attrs.email !== 'string') {
        return "Email must be a string";
      }
      if (!attrs.phoneNumber) {
        return "Phone number is required";
      }
       if (!attrs.cityState) {
        return "City and State is required";
      }
      if (typeof attrs.phoneNumber !== 'string') {
        return "Phone number must be a string";
      }
       if (typeof attrs.cityState !== 'string') {
        return "City and State must be a string";
      }
    },
    _parse_class_name: "People"
  });

  var contact = new Person();

  var People = Backbone.Collection.extend({
    model: Person,
    _parse_class_name: "People"
  })

  var PeopleCollection = new People();

  PeopleCollection.fetch({
    success: function(resp){
      var contactObj = {'contact':resp.toJSON()};
      var contactTemplate = $("#contactTemplate").text();
      var contactHTML = Mustache.render(contactTemplate, contactObj);
        $("#contacts").html(contactHTML);
          console.log("success: ", resp);
        }, error: function(err){
          console.log("error: ", err);
        }
  });

  var Router = Backbone.Router.extend({
    initialize: function(){
      Backbone.history.start({pushState: true});
    },
    routes:{
      "name/:objectId": "name",
      "": "index"
    }
  });

  var router = new Router();

  router.on('route:name', function(objectId){
    var contact = new Person({objectId: objectId});
    contact.fetch({
      success: function(resp){
      var personObj = {'person': resp.toJSON()};
      var personTemplate = $("#personTemplate").text();
      var personHTML = Mustache.render(personTemplate, personObj);
        $("#people").html(personHTML);
        $("#contacts").hide();
        $("#people").show();
      },error: function(err){
        console.log("error ", err);
      }
  })
  });

  router.on('route:index', function(){
    $("#contacts").show();
    $("#people").hide();
  });


  $("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });
});
