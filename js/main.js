// requirejs.config({
//     baseUrl: 'js',
//     paths: {
//         // the left side is the module ID,
//         // the right side is the path to
//         // the jQuery file, relative to baseUrl.
//         // Also, the path should NOT include
//         // the '.js' file extension. This example
//         // is using jQuery 1.9.0 located at
//         // js/lib/jquery-1.9.0.js, relative to
//         // the HTML page.
//         jquery: 'https://code.jquery.com/jquery-1.11.3.min',
//         underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
//         backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min',
//         parse: 'http://www.parsecdn.com/js/parse-latest',
// 				backboneParse: 'lib/backbone-parse',
//         mustache: 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.0/mustache'
//     }
// });
//
$(document).ready(function(){
	$("body").on('click', "a", function(e){
  e.preventDefault();
  var href = $(this).attr('href');
	console.log(href);
  // href = href.substr(1);
  router.navigate(href, {trigger:true});
	});


var Contact = Backbone.Model.extend( {
	initialize: function() {

	},
	defaults: {
		last_name: null,
		first_name: null,
		email: null,
		phone_number: null,
		city: null,
		state: null
	},

	_parse_class_name: "Contact",
	// idAttribute: "objectId"
});


var Contacts = Backbone.Collection.extend({
	model: Contact,
	_parse_class_name: "Contact"
});

var contactList = new Contacts();

contactList.fetch({
      success: function(resp) {
      console.log(resp.toJSON());
			var contactData = {person: resp.toJSON()};
			console.log(contactData);
      var contactTemplate = $('#people').text();
      var contactHTML = Mustache.render(contactTemplate, contactData);
      $('#contact-index').html(contactHTML);

      }, error: function (err) {
        console.log("error: ", err);
      }
    });

    var Router = Backbone.Router.extend({
      initialize: function () {
        Backbone.history.start({pushState: true});
      },
      routes: {
        "person/:objectID": "person",
        "": "index"
      }
    });

		var router = new Router();

    router.on('route:person', function(objectId) {
          var peepData = {"peep": contactList.get(objectId).toJSON()};
          var peepTemplate = $('#peep').text();
          var peepHTML = Mustache.render(peepTemplate, peepData);
          $('#single-contact').html(peepHTML);
					$('#contact-index').hide();
					$('#single-contact').show();
			});

		router.on('route:index', function () {
			$('#contact-index').show();
			$('#single-contact').hide();
	    });
});
