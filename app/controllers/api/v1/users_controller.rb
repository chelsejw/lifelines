module Api 
    module V1
        class UsersController < ApplicationController
            before_action :set_user, only: [:show, :edit, :update, :destroy]
            # GET /appeals
            # GET /appeals.json

            def isloggedin
                if user_signed_in?
                  @user = current_user
                    render json: {isloggedIn: true, user: @user}
                else
                    render json: {isLoggedIn: false}
                end
            end

            def logout
              if user_signed_in?
                @user = current_user
                sign_out @user
                redirect_to root_path
              else
                redirect_to root_path
              end
            end

            private
              # Use callbacks to share common setup or constraints between actions.
              def set_user
                @user = current_user
              end
          
              # Only allow a list of trusted parameters through.
              def user_params
                params.require(:user).permit(:email)
              end
          end
    end
end