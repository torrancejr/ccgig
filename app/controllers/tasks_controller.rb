class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def show
    @tasks = Task.all
    @task = Task.find(params[:id])
    @quote = @task.quotes
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
       UserMailer.new_task(@task).deliver_now
       redirect_to root_path
     else
       flash[:notice] = @task.errors.full_messages.to_sentence
       redirect_to new_task_path
     end
   end

   def edit
    @task = Task.find(params[:id])
   end

   def destroy
    @task = Task.find(params[:id])
    @task.destroy
    flash[:notice] = "Task deleted"
    redirect_to task_path(@task)
  end

  def update
      @task = Task.find(params[:id])
      if @task.update_attributes(task_params)
      flash[:notice] = "Task updated!"
      redirect_to task_path(@task)
    else
      flash[:notice] = @task.errors.full_messages.to_sentence
      render :edit
    end
  end

 private

    def task_params
      params.require(:task).permit(:name, :location, :description, :task_length, :task_date, :user)
    end

end
