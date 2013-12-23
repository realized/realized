require 'bundler'

Bundler.require

# stdlib requires
require 'pathname'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

%w{app lib config}.each do |directory|
  # add directory to load path
  # (so you can require files with require directly)
  $: << APP_ROOT.join(directory).to_s
end

require 'real/inner_parser'
require 'real/parser'
require 'real/processor'

require 'settings/base'
require 'settings/provide'
require 'render_helper'
require 'realized'
