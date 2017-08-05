class Api::V1::TasksController < ApplicationController
  def index
    render json: { tasks: Task.all }
  end
end
