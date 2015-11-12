$(document).ready(function(){
var Contacts = Backbone.Model.extend({
    initialize: function () {
      console.log ("A new list has been created");
      },
      defaults:{
        Name: null,
        Email: null,
        Location: null,
        Number: null
      },
      _parse_class_name:"list"
    });
  

  var List = new Contacts();

  var Lists = Backbone.Collection.extend({
    model: Contacts,
    _parse_class_name: "list"
  });


  var ListsCollection = new Lists();

//Contact list
    ListsCollection.fetch({
      success: function(resp) {
        var taco = {"meat":resp.toJSON()};
        var mexicoTemplate = $("#mexicoTemplate").text();
        var mexicoHTML = Mustache.render(mexicoTemplate,taco);
        $("#main").html(mexicoHTML);
        console.log("success: ", resp);
      }, error: function (err) {
        console.log("error: ", err);
      }
    });

    var Router = Backbone.Router.extend ({
      initialize:function(){
        Backbone.history.start({pushState:true});
      },
      routes:{
        "name/:objectId":"name",
        "":"index"
      }
    });

//individual info

    var router = new Router();

    router.on('route:name', function(objectId){
    var person = new Contacts({objectId:objectId});
  
    person.fetch({
      success: function(resp){
        var personInfo = {'persons': resp.toJSON()};
        var personTemplate = $("#personTemplate").text();
        var personHTML = Mustache.render(personTemplate , personInfo);
        $("#info").html(personHTML);
      },error:function(err){
        console.log("error " , err);
      }
    })
    });


  $("body").on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    href = href.substr(1);
    router.navigate(href,{trigger:true});
  });
});









