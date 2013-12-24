require 'pp'
class Realized < Sinatra::Base
  include RenderHelper

  # Sinatra Settings:
  set :environment, :production
  set :sessions, true
  set :logging, true

  # Template Settings:
  set :public_folder, 'public'
  set :views, 'app/views'
  set :haml, format: :html5, locals: {title: 'realized - the .real editor'}

  # Own Settings:
  # set :foo, 'bar'

  # Routes
  get '/' do
    parser = REAL::Processor.new(
      APP_ROOT.join('test/fixtures/circuits/sym9_147.real'))
    rrender :index, content: parser.parse
  end


  # Routes for Templates and Compiled Stuff
  get '/css/:file.css' do |file|
    scss file.to_sym
  end

end

