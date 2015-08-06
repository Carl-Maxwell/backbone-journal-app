Journal.Views.PostShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },
  events: {
    "click .delete-post": "deleteButton",
    "dblclick .title" : "editTitle",
    "dblclick .body" : "editBody",
    "blur .title input" : "saveTitle",
    "blur .body textarea" : "saveBody"
  },

  template: JST['post_show'],

  render: function() {
    this.$el.html(this.template({post: this.model}));

    return this;
  },

  deleteButton: function() {
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("", {trigger: true});
  },

  editTitle: function(e) {
    var $title = $(e.currentTarget);
    var value = $title.text();
    var $inputBox = $("<input type='text' name='post[title]'>");
    $inputBox.val(value);
    $title.html($inputBox);
    $inputBox.focus();
  },

  saveTitle: function(e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.model.save(formData.post, {
      success: function() {
        // this.collection.add(this.model);
      }.bind(this)
    } );
  },

  editBody: function(e) {
    var $body = $(e.currentTarget);
    var value = $body.text();
    var $inputBox = $("<textarea name='post[body]'>")
    $inputBox.val(value);
    $body.html($inputBox);
    $inputBox.focus();
  },

  saveBody: function(e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.model.save(formData.post, {
      success: function() {
        // this.collection.add(this.model);
      }.bind(this)
    } );
  }
})
