# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::cors do
    allow do
        origins '*'
        resource '*', headers: :any, methods: :any
    end
end

run Rails.application
