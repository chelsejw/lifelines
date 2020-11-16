module Api 
    module V1
        class LifelinesController < ApplicationController
            
            before_action :set_lifeline, only: [:show, :edit, :update, :destroy]


            # GET /lifelines
            # GET /lifelines.json
            def index
              @lifelines = Lifeline.all.order('id DESC')
              render json: @lifelines
            end
            
            # GET /lifelines/1
            # GET /lifelines/1.json
            def show
            @lifeline = Lifeline.find(params[:id])
            render json: @lifeline
            end
          
            # GET /lifelines/new
            def new
              @lifeline = Lifeline.new
            end
          
            # GET /lifelines/1/edit
            def edit
            end
          
            # POST /lifelines
            # POST /lifelines.json
            def create
              if !user_signed_in?
                render json: {error: "You must be signed in to throw a lifeline."}, status: 403
              end
              @lifeline = Lifeline.new(user_id: current_user.id, appeal_id: params[:id], status: "unconfirmed")
          
              if @lifeline.save
                render json: @lifeline
              else
                render json: { error: @lifeline.errors.messages }, status: 422
              end
            end
          
            # PATCH/PUT /lifelines/1
            # PATCH/PUT /lifelines/1.json
            def update
              if @lifeline.user_id!=current_user.id
                render json: {error: "You are not allowed to edit this lifeline."}, status: 403
              
              end
              
              if @lifeline.update(lifeline_params)
                render json: @lifeline
              else
                render json: { error: @lifeline.errors.messages }, status: 422
              end
          
            end
          
            # DELETE /lifelines/1
            # DELETE /lifelines/1.json
            def destroy
              @lifeline.destroy
              respond_to do |format|
                format.html { redirect_to lifelines_url, notice: 'lifeline was successfully destroyed.' }
                format.json { head :no_content }
              end
            end
          
            private
              # Use callbacks to share common setup or constraints between actions.
              def set_lifeline
                @lifeline = Lifeline.find(params[:id])
              end
          
              # Only allow a list of trusted parameters through.
              def lifeline_params
                params.require(:lifeline).permit(:user_id, :status, :appeal_id)
              end
          end
          
    end
end