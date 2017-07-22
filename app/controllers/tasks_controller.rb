class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def show
  @task = Task.find(params[:id])
  # @quote = @task.quotes
end

  def new
    @task = Task.new
     @task.user_id = current_user
  end

  def create
   @task = Task.new(task_params)
   @task.task_date = Time.now
   @task.user = current_user

     if @task.save
       flash[:notice] = "Task Successfully Created"
      #  UserMailer.new_auction(@task).deliver_now
       redirect_to root_path
     else
       flash[:notice] = @task.errors.full_messages.to_sentence
       redirect_to new_task_path
     end
   end

 private

    def task_params
      params.require(:task).permit(:name, :location, :description, :task_date, :user)
    end

end
