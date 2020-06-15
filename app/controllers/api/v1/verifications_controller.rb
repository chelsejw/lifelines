module Api 
    module V1
        class VerificationsController < ApplicationController
            # GET /appeals
            # GET /appeals.json
            def index

                    @verifications = Verification.where(authorizer_id: current_user.id, status: "pending")
                    render json: @verifications, each_serializer: Serializers::VerificationSerializer
        
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

            def approve
                @verification = Verification.find(params[:id])
                @verification.update(status: "approve")
                @verification.save
                if @verification.verification_for=="donor"
                    @verification.user.profile.update(verified: true)
                elsif @verification.verification_for=='clinic'
                    @verification.user.profile.update(account_type: 'clinic', verified: true)
                end
                render json: @verification
            end

            def reject
                @verification = Verification.find(params[:id])
                @verification.update(status: "reject")
                @verification.save
                render json: @verification
            end

            private

              # Only allow a list of trusted parameters through.
              def verification_params
                params.require(:verification).permit(:user_id, :authorizer_id, :verification_for, :status, :details, :owner_name, :mobile, :pet_name)
              end
          end 
    end
end