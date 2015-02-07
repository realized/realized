require 'pathname'

class Provide < Settings::Base

  APP_SETTINGS = Realized.settings

  public_dir = APP_ROOT.join('public')

  js_dir = public_dir.join('js')
  if File.exists?(js_dir)
    js_files = Pathname.glob("#{js_dir}/**/*.js").sort.map { |p| p.relative_path_from(js_dir) }

    set :js_files, js_files
  else
    set :js_files, []
  end

  css_dir = public_dir.join('css')
  if File.exists?(css_dir)
    css_files = Pathname.glob("#{css_dir}/**/*.css").sort.map { |p| p.relative_path_from(css_dir) }

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

