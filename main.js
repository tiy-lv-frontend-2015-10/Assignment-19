var Contact = Backbone.Model.extend({
  initialize: function() {
    },
    defaults: {
      first: null,
      last: null,
      email: null,
      phone: null,
      location: null
    },
   Model: Contact,
  _parse_class_name: "Contact"
});

var Contacts = Backbone.Collection.extend({
  Model: Contact,
  _parse_class_name: "Contact"
});

var ContactsCollection = new Contacts();

ContactsCollection.fetch({
  success: function(resp) {
    var dataObj = {"data": resp.toJSON()};
    var contactTemplate = $("#contactTemplate").text();
    var contactHTML = Mustache.render(contactTemplate, dataObj);
    $("#contactList").html(contactHTML);
    console.log("success: ", resp);
  }, error: function (err) {
    console.log("error: ", err);
  }
});