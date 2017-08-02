class ReviewsController < ApplicationController
  def new
    @user = User.find(params[:user_id])
    @review = current_user.reviews.new
   end

   def create
     @review = current_user.reviews.new(review_params)
     @review.save
   end

   private

   def review_params
      params.require(:review).permit(:rating, :body).merge(reviewed_id: params[:user_id])
   end
end
