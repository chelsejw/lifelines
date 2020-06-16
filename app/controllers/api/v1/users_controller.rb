module Api 
    module V1
        class UsersController < ApplicationController
            before_action :set_user, only: [:show, :edit, :update, :destroy]
            # GET /appeals
            # GET /appeals.json

            def isloggedin
                if user_signed_in?
                  @user = current_user
                  if @user.verifications.where(status: "pending").count < 1
                    has_verifications_pending = false
                  else
                    has_verifications_pending = true
                  end
                  render json: {isloggedIn: true, user: @user, profile: @user.profile, pendingVerifications: has_verifications_pending}
                
                else
                    render json: {isLoggedIn: false}
                end
            end

            def show
              @user = User.find(params[:id])
              render json: @user
            end

            def get_clinic_accounts
              @accounts = Profile.joins(:user).where(account_type: 'clinic')
              render json: {clinics: @accounts}
            end

            def get_profile
              if user_signed_in?
                @profile = current_user.profile
                render json: {profile: @profile}
              else
                redirect_to new_user_session_path
              end
            end
            
            def update_profile
              if !user_signed_in?
                render json: {status: "ERROR"}, status: 403
              end

              @profile = current_user.profile
              @profile.update(profile_params)
              if @profile.save
                render json: {status: "OK", profile: @profile}
              else
                render json: {status: "ERROR"}, status: 422
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

              def profile_params
                params.require(:profile).permit(:user_id, :display_name, :img_url, :address, :account_type, :verified, :bio, :username)
              end
          end
    end
end