require 'bundler'

Bundler.require

# stdlib requires
require 'pathname'

APP_ROOT = Pathname.new(File.expand_path('../', __FILE__))

%w{lib}.each do |directory|
  # add directory to load path
  # (so you can require files with require directly)
  $: << APP_ROOT.join(directory).to_s
end

require 'parser'
require 'processor'


