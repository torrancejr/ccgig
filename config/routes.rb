Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :welcome

  resources :users do
    resources :tasks
  end

  resources :tasks do
    resources :quotes
  end

end
