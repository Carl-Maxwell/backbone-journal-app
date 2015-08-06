Journal.Views.PostIndexItem = Backbone.View.extend({
  template: JST['posts_index_item'],

  tagName: 'li',

  events: {
    "click button.delete-post": "deleteButton"
  },

  render: function() {
    this.$el.html(this.template({post: this.model}));
    return this;
  },

  deleteButton: function(e) {
    this.model.destroy();
    this.remove();
  }

})
