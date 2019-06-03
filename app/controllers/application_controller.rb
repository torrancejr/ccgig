class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone, :username])
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :username, :phone, :email, :password, :password_confirmation, :current_password) }
  end
end
