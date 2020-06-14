require 'telegram/bot'
token = ENV['TELEGRAM_BOT_API_KEY']

module Api 
    module V1
        class AppealsController < ApplicationController
            
            before_action :set_appeal, only: [:show, :edit, :update, :destroy, :get_lifelines]
            # GET /appeals
            # GET /appeals.json
            def index
              @appeals = Appeal.all.order('id DESC').first(10)
              render json: @appeals
            end
            
            # GET /appeals/1
            # GET /appeals/1.json
            def show
            @appeal = Appeal.find(params[:id])
            render json: @appeal
            end

            def get_lifelines
              @lifelines = @appeal.lifelines
              puts current_user.id
              user_lifelines = @lifelines.where({user_id: current_user.id})
              if user_lifelines.length==0
                is_user_connected = false
              else
                is_user_connected = true
              end
              render json: { lifelines: @lifelines, isUserConnected: is_user_connected}
            end

            def throw_lifeline
              @lifeline = Lifeline.new(user_id: current_user.id, appeal_id: params[:id], confirmed: false)
              
              if @lifeline.save
                render json: @lifeline
              else
                byebug
                render json: {error: @lifeline.errors}, status: 403
              end
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
                # UserNotifierMailer.send_appeal_notice(@appeal).deliver_later
                
                
              Telegram::Bot::Client.run(ENV['TELEGRAM_BOT_API_KEY']) do |bot|

                Bot.all.each do |u|
                  bot.api.send_message(chat_id: u.chat_id, text: "#{@appeal.species.name} donor needed at #{@appeal.clinic.name}! Go to http://lifelines.herokuapp.com/appeals/#{@appeal.id} to help.")
                end
              end

                render json: @appeal
              else
                render json: { error: @appeal.errors.messages }, status: 422
              end
            end
          
            # PATCH/PUT /appeals/1
            # PATCH/PUT /appeals/1.json
            def update
              if @appeal.user_id!=current_user.id
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
                params.require(:appeal).permit(:user_id, :img_url, :clinic_id, :species_id, :pet_name, :description, :status, :lifelines=> [])
              end
          end
          
    end
end