Journal.Routers.PostsRouter = Backbone.Router.extend({

  initialize: function (options) {
    this.$el = options.$el;
    this.$sidebar = options.$sidebar;
    this.collection = options.collection;

    this.sidebarView = new Journal.Views.PostsIndex({collection: this.collection});
    this.$sidebar.html(this.sidebarView.render().$el);
  },
  routes: {
    "": "root",
    "posts/new" : "postNew",
    "posts/:id": "post",
    "posts/:id/edit": "postEdit",
  },

  root: function () {
    if (this._currentView) {
      this._currentView.remove();
      this._currentView = null;
    }

  },

  post: function (id) {
    var model = this.collection.getOrFetch(id);
    var view = new Journal.Views.PostShow({model: model});
    this.swap(view);
  },

  postEdit: function(id) {
    var model = this.collection.getOrFetch(id);
    var view = new Journal.Views.PostForm({
      model: model, collection: this.collection
    });
    this.swap(view);
  },

  postNew: function() {
    var post = new Journal.Models.Post();
    var view = new Journal.Views.PostForm({
      model: post, collection: this.collection
    });
    this.swap(view);
  },

  swap: function(view) {
    if (this._currentView) {this._currentView.remove(); }
    this._currentView = view;
    this.$el.html(view.render().$el);
  }

})
