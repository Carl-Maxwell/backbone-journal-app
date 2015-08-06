Journal.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],
  events: {
    "submit form": "submitForm"
  },
  render: function() {
    this.$el.html(this.template({post: this.model}));

    return this;
  },

  submitForm: function(e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.model.save(formData.post , {
      success: function() {
        var url = "posts/" + this.model.get('id');
        this.collection.add(this.model);
        Backbone.history.navigate(url, {trigger: true});
      }.bind(this),
      error: function(request, response, status) {
        this.$el.find('.errors').empty();
        response.responseJSON.forEach(function(error) {
          this.$el.find('.errors').append(error);
        }.bind(this));
      }.bind(this),
    });
  }
})
