require 'pathname'

class Provide < Settings::Base

  APP_SETTINGS = Realized.settings
  ORDER_FILE_NAME = 'ordering.txt'
  ORDER_COMMENT_RE = /\A\s*#|\A\s*\Z/

  public_dir = APP_ROOT.join('public')
  PUBLIC_DIR = APP_ROOT.join('public')

  def self.order_for_query(list, type)
    order_file = PUBLIC_DIR.join(type, ORDER_FILE_NAME)
    if File.exists?(order_file)
      ordered_files = order_file.readlines.reduce([]) do |entries, oe|
        entries << Pathname.new(oe.strip) unless oe =~ ORDER_COMMENT_RE
        entries
      end
      ordered_files | list.sort
    else
      list.sort
    end
  end

  %w(js css).each do |sub|
    sub_dir = public_dir.join(sub)
    if File.exists?(sub_dir)
      sub_files = Pathname.glob("#{sub_dir}/**/*.#{sub}").
        map { |p| p.relative_path_from(sub_dir) }

      set :"#{sub}_files", order_for_query(sub_files, sub)
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

