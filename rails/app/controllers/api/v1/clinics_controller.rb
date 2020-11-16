module Api 
    module V1
        class ClinicsController < ApplicationController

            before_action :set_clinic, only: [:show, :edit, :update, :destroy]
            # GET /appeals
            # GET /appeals.json
            def index
              @clinics = Clinic.all.order('id DESC')
              render json: @clinics
            end
          
            # GET /appeals/1
            # GET /appeals/1.json
            def show
            render json: @clinic
            end
     
            private
              # Use callbacks to share common setup or constraints between actions.
              def set_clinic
                @clinic = Clinic.find(params[:id])
              end
          
              # Only allow a list of trusted parameters through.
              def clinic_params
                params.require(:clinic).permit(:name, :phone, :address, :email)
              end
          end
          
    end
end