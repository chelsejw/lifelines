Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :appeals
      resources :clinics
      resources :species
      resources :users
      get '/auth/check-login', to: "users#isloggedin"
      get '/auth/logout', to: "users#logout"
    end
  end
  devise_for :users, :controllers => {:registrations => "users/registrations"}
  root 'pages#index', to: "/"
  match '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
