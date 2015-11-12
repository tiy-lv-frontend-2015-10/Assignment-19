$(document).ready(function(){



var Contact = Backbone.Model.extend({
  initialize: function () {
    console.log("A new contact has been created");
  },
  _parse_class_name: "Contact",
  idAttribute: "objectId"
});

var Contacts = Backbone.Collection.extend({
	model:Contact,
	_parse_class_name:"Contact"
});

var ContactCollection = new Contacts();

var contact = new Contact({
	fName:"Nick",
	lName:"Reynolds",
	phoneNumber: "702-555-5555",
	email: "nickwookie@yahoo.com",
});

var contact2 = new Contact({
	fName:"Mychelle",
	lName:"Blake",
	phoneNumber:"702-777-7878",
	email:"yoyo@yahoo.com"
})

var contact3 =new Contact({
	fName:"Monica",
	lName:"Miller",
	phoneNumber:"702-122-9898",
	email:"drinkmiller@yahoo.com"
})

var contact4 = new Contact({
	fName:"Jaimariev",
	lName:"J",
	phoneNumber:"702-877-9888",
	email:"orangeisnewchicken@yahoo.com"
})

var contact5 = new Contact({
	fName:"Mike",
	lName:"Sweeney",
	phoneNumber:"702-877-1500",
	email:"imateacher@yahoo.com"
})



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
  router.navigate(href, {trigger:true});
});








});