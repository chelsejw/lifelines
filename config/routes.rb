Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :appeals
    end
  end

  get '/', to: 'pages#index'

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
