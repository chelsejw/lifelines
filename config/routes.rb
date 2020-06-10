Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :appeals
    end
  end

  root 'pages#index'

  match '*path', to: 'pages#index', via: :all

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
