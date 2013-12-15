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

#######################################################################
#                          Application Portion                        #
#                                                                     #
#######################################################################

REAL_TEST_FILE = APP_ROOT.join('test/fixtures/reversible_circuit.real')

file = REAL_TEST_FILE.open('r')
real_input = file.read
file.close

begin
  parsed = REAL::Parser.new.parse(real_input)
  puts parsed
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
