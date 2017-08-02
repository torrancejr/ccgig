class ReviewsController < ApplicationController

  def index
    @reviews = Review.all
  end
  def new
    @user = User.find(params[:user_id])
    @review = current_user.reviews.new
   end

   def create
     @user = current_user
     @review = current_user.reviews.new(review_params)
     if @review.save
      flash[:notice] = "Review added successfully"
      redirect_to new_welcome_path(@user)
    else
      flash[:notice] = @review.errors.full_messages.to_sentence
      render :new
    end
   end

   private

   def review_params
      params.require(:review).permit(:rating, :body).merge(reviewed_id: params[:user_id])
   end
end
