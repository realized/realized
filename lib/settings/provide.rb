require 'pathname'

class Provide < Settings::Base

  APP_SETTINGS = Realized.settings

  public_dir = APP_ROOT.join('public')

  %w(js css).each do |sub|
    sub_dir = public_dir.join(sub)
    if File.exists?(sub_dir)
      sub_files = Pathname.glob("#{sub_dir}/**/*.#{sub}").sort.
        map { |p| p.relative_path_from(sub_dir) }

      set :"#{sub}_files", sub_files
    else
      set :"#{sub}_files", []
    end
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

