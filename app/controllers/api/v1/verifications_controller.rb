module Api 
    module V1
        class VerificationsController < ApplicationController
            # GET /appeals
            # GET /appeals.json
            def index
              @species = Species.all
              render json: @species
            end

            def create
                @verification = Verification.new(verification_params)
                @verification.user = current_user
                @verification.status = "pending"
                if @verification.save
                    render json: {verification: @verification}
                else
                    byebug
                    render json: {errors: @verification.errors}, status: 422
                end
            end

            def show
                @verification = Verification.find(params[:id])
                render json: {verification: @verification}
            end

            def approve_verification
                @verification = Verification.find(params[:id])
                @verification.update(status: "approve")
                @verification.save
                if @verification.type=="donor"
                    @verification.user.update(verified: true)
                elsif @verification.type=='clinic'
                    @verification.user.update(account_type: 'clinic', verified: true)
                end
            end

            private

              # Only allow a list of trusted parameters through.
              def verification_params
                params.require(:verification).permit(:user_id, :authorizer_id, :verification_for, :status, :details, :owner_name, :mobile, :pet_name)
              end
          end 
    end
end