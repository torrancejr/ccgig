class Api::V1::TasksController < ApplicationController
  def index
    render json: { tasks: Task.all }
  end

  def destroy
    Task.where(id: params[:id]).destroy_all
  end

  def create
    user = current_user
    body = params[:body]
    Task.create(name: name, location: location, description: description, task_length: task_length, task_date: task_date, user_id: user.id )
    render json: { post: body}
  end

end
