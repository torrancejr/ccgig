Rails.application.routes.draw do
  post '/rate' => 'rater#create', :as => 'rate'
  root "welcome#index"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :welcome

  resources :users do
    resources :tasks
  end

  resources :tasks do
    resources :quotes do
      put :winning_quote
    end
  end

  resources :users do
   resources :reviews, only: [:new, :create]
 end

  namespace :api do
    namespace :v1 do
      resources :users
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end

end
