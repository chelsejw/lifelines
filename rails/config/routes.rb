Rails.application.routes.draw do

  # post '/webhooks/telegram_123' => 'webhooks#callback'


  resources :conversations
  resources :messages
    mount ActionCable.server => '/websocket'

  namespace :api do
    namespace :v1 do
            get '/appeals/user', to: "appeals#user_appeals"
      resources :appeals
        get '/appeals/:id/get-lifelines', to: "appeals#get_lifelines"
        post '/appeals/:id/throw-lifeline', to: "appeals#throw_lifeline"
      resources :verifications
      get '/verifications/:id/approve', to: "verifications#approve"
      get '/verifications/:id/reject', to: "verifications#reject"

      resources :documents
      resources :clinics
      resources :species
            get '/users/clinics', to: "users#get_clinic_accounts"

      resources :users
      get '/auth/user-profile', to: "users#get_profile"
      patch '/auth/user-profile', to: "users#update_profile"

      get '/auth/check-login', to: "users#isloggedin"
      get '/auth/logout', to: "users#logout"
    end
  end
  devise_for :users, :controllers => {:registrations => "users/registrations"}
  root 'pages#index', to: "/"
  match '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
