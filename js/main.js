var Contacts = Backbone.Model.extend({
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
  idAttribute: "objectId",
});



var Contacts = Backbone.Collection.extend({
  model: Contacts,
  _parse_class_name: "Contacts"
});
var ContactsCollection = new Contacts();


ContactsCollection.fetch({
  success: function(resp) {
  var personObj = {"person" : resp.toJSON()};
  var nameTemplate = $("#nameTemplate").text();
  var nameHTML = Mustache.render(nameTemplate, personObj);
    $("#names").html(nameHTML);
      console.log("success: ", resp);
    },error: function(err){
      console.log("error: ", err);
    }
});




/*var Router = Backbone.Router.extend({
  initialize: function () {
    Backbone.history.start({pushState: true});
  }
  routes: {
    "name":"name",
    "": "index"
  }
});

var router = new Router ();
router.on("route: name", function (objectId){
    var AllContacts = new Contacts({objectId: objectId});
    Contacts.fetch();
    console.log(Contacts);
});

router.on("route: index", function () {
  console.log("home page");
});

router.on("route: name", function(){
  console.log("name");
})







*/


