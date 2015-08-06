class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save
      account_sid = "ACdb23a09cbaffc61de8a2442ba48b7e9a"
      auth_token = "e1f4c454d5fb50fda597bce29ad2bc5a"
      @client = Twilio::REST::Client.new account_sid, auth_token
      @client.messages.create(
        from: '+18053303663',
        to: '+19517035931',
        body: 'damn it feels good to be a gangster'
      )

      render 'show'
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @posts = Post.all
    render 'index'
  end

  def show
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render 'show'
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
    render 'show'
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
