class QuotesController < ApplicationController

  def index
    @task = Task.find(params[:task_id])
    @quotes = @task.quotes
  end

  def new
    @task = Task.find(params[:task_id])
    @quote = Quote.new
  end

  def create
    @task = Task.find(params[:task_id])
    @quote = Quote.new(quote_params)
    @quote.task = @task
    @quote.user = current_user

    if @quote.save
      flash[:notice] = "Quote emailed!"
      redirect_to task_path(@task)
    else
      flash[:notice] = @quote.errors.full_messages.to_sentence
      redirect_to new_task_quote_path(@task)
    end
  end

  def accept
      @quote = Quote.find(params[:id])
      @quote.update_attribute(:accepted, true)
      @quote.task.quotes.each do |rejected_quotes|
        rejected_quote.destroy unless rejected_quote == @quote   # destroys all be the accepted bid
      end

      flash[:notice] = "Quote accepted."
      redirect_to task_quotes_path(@task)
  end

    def quote_params
      params.require(:quote).permit(:quote, :accepted_qoute)
    end
end
