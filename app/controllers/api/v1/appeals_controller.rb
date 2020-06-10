module Api 
    module V1
        class AppealsController < ApplicationController
            def index
                @appeals = Appeal.all
                render json: @appeals
            end

            def show
                @appeal = Appeal.find(params[:id])
                render json: @appeal
            end
        end
    end
end