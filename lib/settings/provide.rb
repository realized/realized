class Provide < Settings::Base

  js_dir = File.join(APP_ROOT, 'public/js/')
  if File.exists?(js_dir)
    js_dir_files = Dir.entries(js_dir)
    js_files = js_dir_files.select { |f| f =~ /\.js$/ }

    set :js_files, js_files
  else
    set :js_files, []
  end

  css_dir = File.join(APP_ROOT, 'public/css/')
  if File.exists?(css_dir)
    css_dir_files = Dir.entries(css_dir)
    css_files = css_dir_files.select { |f| f =~ /\.css$/ }

    set :css_files, css_files
  else
    set :css_files, []
  end

end

