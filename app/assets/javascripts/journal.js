window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // instantiate a view
    var collection = new Journal.Collections.Posts();
    // var view = new Journal.Views.PostsIndex({collection: collection});
    collection.fetch();
    // $("body").html(view.render().$el);
    // alert('Hello from Backbone!');
    var router = new Journal.Routers.PostsRouter({
      $el: $(".content"),
      collection: collection,
      $sidebar: $('.sidebar')
    });

    Backbone.history.start()
  }
};

$(document).ready(function(){
  Journal.initialize();
});
