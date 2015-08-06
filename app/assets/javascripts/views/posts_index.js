Journal.Views.PostsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "remove sync reset add", this.render);
  },
  template: JST['posts_index'],
  render: function() {
    this.$el.html(this.template());
    this.collection.each( function(post) {
      var item = new Journal.Views.PostIndexItem({model: post});
      this.$el.find('ul').append(item.render().$el);
    }.bind(this));

    return this;
  }

})
