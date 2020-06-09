module Api 
    module V1
        class AppealsController < ApplicationController
            def index
                @appeals = Appeal.all
                render json: @appeals
            end
        end
    end
end