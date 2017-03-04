$(document).ready(function(){

var Contact = Backbone.Model.extend({
	initialize: function () {
		console.log("New contact created !");
	},
  defaults: {
	location: null,
	email: null,
	name: null,
	phone: null

  }, 
  _parse_class_name: "Contacts",
});


var Contacts = Backbone.Collection.extend({
  model: Contact,
  _parse_class_name: "Contacts"
});


//names
var ContactsCollection = new Contacts();
ContactCollection.fetch({
  success: function(resp) {
    //contacts
    var contactsObj = {'data':resp.toJSON()};
    var template=$('#contactTemplate').text();
    var contactsHtml = Mustache.render(template,contactsObj);
    $("#contactsDiv").html(contactsHtml);
    //person
    


    },
  error: function(resp) {
    console.log(resp);
  }
});


//router//

var Router = Backbone.Router.extend({
  initialize: function () {
    Backbone.history.start({pushState: true});
  },
  routes: {
    "name/:objectId":"name",
    "":"index",
    "test":"test"
  }
});

var router = new Router();

router.on('route:index', function() {
  $("#contactsDiv").show();
  $("#personDiv").hide();
  $("#myPeeps").show();
  $("#contactHeader").hide();

})

router.on('route:name', function(objectId) {
  var name = new Contact({objectId: objectId});
  name.fetch({
    success: function(resp){
      var personObj = {'data':resp.toJSON()};
    var template2=$('#personTemplate').text();
    var personHtml = Mustache.render(template2,personObj);
    $("#personDiv").html(personHtml);
    $("#contactsDiv").hide();
    $("#myPeeps").hide();
    $("#contactHeader").show();
    $("#personDiv").show();

    }
  })
  

  
 
});




$("body").on('click',"a", function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  href = href.substr(1);
  router.navigate(href, {trigger:true})
});

});




