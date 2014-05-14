class Provide < Settings::Base

  APP_SETTINGS = Realized.settings

  js_dir = File.join(APP_ROOT, 'public/js/')
  if File.exists?(js_dir)
    js_dir_files = Dir.entries(js_dir)
    js_files = js_dir_files.select { |f| f =~ /\.js$/ }.sort

    set :js_files, js_files
  else
    set :js_files, []
  end

  css_dir = File.join(APP_ROOT, 'public/css/')
  if File.exists?(css_dir)
    css_dir_files = Dir.entries(css_dir)
    css_files = css_dir_files.select { |f| f =~ /\.css$/ }.sort

    set :css_files, css_files
  else
    set :css_files, []
  end

  class << self
    def js(js_files=[])
      return all_js_files if js_files == :all
      self.js_files + js_files
    end


    def css(css_files=[])
      return all_css_files if css_files == :all
      self.css_files + css_files
    end

    def public
      APP_ROOT.join(APP_SETTINGS.public_folder)
    end

    def views
      APP_ROOT.join(APP_SETTINGS.views)
    end

    protected
    def all_js_files
      coffee = views.join('coffee')
      self.js_files +
        Dir.glob(coffee.join('**/*.coffee')).
          map { |f| f.wipe(coffee).sub(/\.coffee\z/, '.js') }
    end

    def all_css_files
      scss = views.join('scss')
      self.css_files +
        Dir.glob(coffee.join('**/*.scss')).
          map { |f| f.wipe(scss).sub(/\.scss\z/, '.css') }
    end
  end

end

