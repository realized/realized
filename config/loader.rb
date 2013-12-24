require 'bundler'

Bundler.require

# stdlib requires
require 'pathname'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

module Loader
  def self.load_in(relative_to_app_root)
    Dir.glob(APP_ROOT.join(relative_to_app_root, '**/*.rb')).each do |f|
      require f
    end
  end
end

%w{app lib config}.each do |directory|
  # add directory to load path
  # (so you can require files with require directly)
  $: << APP_ROOT.join(directory).to_s
end

Loader.load_in('lib/real')
Loader.load_in('lib/settings')

require 'render_helper'
require 'realized'
