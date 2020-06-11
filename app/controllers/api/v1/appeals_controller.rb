module Api 
    module V1
        class AppealsController < ApplicationController
            
            before_action :set_appeal, only: [:show, :edit, :update, :destroy]


            # GET /appeals
            # GET /appeals.json
            def index
              @appeals = Appeal.all.order('id DESC')
              render json: @appeals
            end
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
            # GET /appeals/1
            # GET /appeals/1.json
            def show
            @appeal = Appeal.find(params[:id])
            render json: @appeal
            end
          
            # GET /appeals/new
            def new
              @appeal = Appeal.new
            end
          
            # GET /appeals/1/edit
            def edit
            end
          
            # POST /appeals
            # POST /appeals.json
            def create
              if !user_signed_in?
                render json: {error: "You must be signed in to create an appeal."}, status: 403
              end
              @appeal = Appeal.new(appeal_params)
          
              if @appeal.save
                render json: @appeal
              else
                render json: { error: @appeal.errors.messages }, status: 422
              end
            end
          
            # PATCH/PUT /appeals/1
            # PATCH/PUT /appeals/1.json
            def update
              if @appeal.user_id!=current_user.id
                byebug
                render json: {error: "You are not allowed to edit this appeal."}, status: 403
              
              end
              
              if @appeal.update(appeal_params)
                render json: @appeal
              else
                render json: { error: @appeal.errors.messages }, status: 422
              end
          
            end
          
            # DELETE /appeals/1
            # DELETE /appeals/1.json
            def destroy
              @appeal.destroy
              respond_to do |format|
                format.html { redirect_to appeals_url, notice: 'Appeal was successfully destroyed.' }
                format.json { head :no_content }
              end
            end
          
            private
              # Use callbacks to share common setup or constraints between actions.
              def set_appeal
                @appeal = Appeal.find(params[:id])
              end
          
              # Only allow a list of trusted parameters through.
              def appeal_params
                params.require(:appeal).permit(:user_id, :img_url, :clinic_id, :species_id, :pet_name, :description, :status)
              end
          end
          
    end
end