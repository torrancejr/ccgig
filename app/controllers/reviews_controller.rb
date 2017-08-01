class ReviewsController < ApplicationController

  def index
  end

  def show
  end

  def new
  end


  private

  def review_params
    params.require(:review).permit(:rating, :body)
  end
end
