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
              @appeal = Appeal.new(appeal_params)
          
              respond_to do |format|
                if @appeal.save
                  format.html { redirect_to '/appeals', notice: 'Appeal was successfully created.' }
                  format.json { render :show, status: :created, location: @appeal }
                else
                  format.html { render :new }
                  format.json { render json: @appeal.errors, status: :unprocessable_entity }
                end
              end
            end
          
            # PATCH/PUT /appeals/1
            # PATCH/PUT /appeals/1.json
            def update
              respond_to do |format|
                if @appeal.update(appeal_params)
                  format.html { redirect_to @appeal, notice: 'Appeal was successfully updated.' }
                  format.json { render :show, status: :ok, location: @appeal }
                else
                  format.html { render :edit }
                  format.json { render json: @appeal.errors, status: :unprocessable_entity }
                end
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