var Contacts = Backbone.Model.extend({
	initialize:function () {
		console.log ("A new list has been created");
	},
	  defaults:{
      genre:"Famous Scientist"
      },
	_parse_class_name:"Contacts",
	idAttribute:"objectId"
	
	});

	var Router = Backbone.Router.extend ({
	initialize:function(){
		Backbone.history.start({pushState:true});
	},
	routes:{
	"Name":"Name",
	"Location":"Location",
	"mumber":"Number",
	"Email":"Email",
	"":"index"
	}
	});

	var router = new Router();

	router.on('route:Name' , function(objectId){
	var Name = new Name({objectId:objectId});
	Name.fetch();
	console.log(Name);
	});

	router.on('route:Name' , function(){
	console.log("Name page");
	});

	router.on('route:Location', function(){
    console.log('Location page');
    $("a").css({color:"black"});
    });


   router.on('route:Number' , function(){
      console.log("Number page");
    });

  $("a").on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });


    var list = new Contacts();

    list.set("Location", "Las Vegas")
    list.set({
    Name:"Neomi",
    Number:"702-443-4707",
    });

    var Name = list.get("Name");


	var Name = Backbone.Collection.extend({
  model: Name,
  _parse_class_name: "list"
	});

	var NamesCollection = new Name();
/*
	list.save(null, {
  success: function(resp) {
    console.log(resp)
*/
	NamesCollection.fetch({
      success: function(resp) {
        console.log("success: ", resp);
      }, error: function (err) {
        console.log("error: ", err);
      }
    })
    },
    error: function (err) {
    console.log(err)
  	  }
	});





