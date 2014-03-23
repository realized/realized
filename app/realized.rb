require 'pp'
class Realized < Sinatra::Base
  include RenderHelper
  CIRCUITS_DIR = APP_ROOT.join("test/fixtures/circuits/")

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
      CIRCUITS_DIR.join('sym9_147.real'))
    parser.parse
    rrender :index, content: parser.contain
  end

  get '/parsed/:file.real' do |file|
    content_type :json
    path = CIRCUITS_DIR.join("#{file}.real")
    if path.exist?
      parser = REAL::Processor.new(path)
      parser.parse
      parser.contain.to_json
    else
      status 404
      {file_not_found: "#{file}.real"}.to_json
    end
  end


  # Routes for Templates and Compiled Stuff
  get '/css/:file.css' do |file|
    provide_css file.to_sym
  end

  get '/js/:file.js' do |file|
    provide_js file.to_sym
  end

end

