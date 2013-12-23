require_relative '../loader.rb'
# This file was generated by the `rspec --init` command. Conventionally, all
# specs live under a `spec` directory, which RSpec adds to the `$LOAD_PATH`.
# Require this file using `require "spec_helper"` to ensure that it is only
# loaded once.
#
# See http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  config.treat_symbols_as_metadata_keys_with_true_values = true
  config.run_all_when_everything_filtered = true
  config.filter_run :focus

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = 'random'
end

SPEC_ROOT = File.expand_path('../', __FILE__)
FIXTURES_ROOT = File.expand_path('../test/fixtures', SPEC_ROOT)

Dir.glob(File.join(SPEC_ROOT, 'support', '**/*.rb')).each do |file|
  require file
end

def fixture(name)
  File.join(FIXTURES_ROOT, name)
end

def fixtures
  Dir.glob(File.join(FIXTURES_ROOT, '**/*.real')).sort_by { |f| File.size?(f) }
end

def fixture_file(name)
  file = File.exists?(name) ? name : File.join(FIXTURES_ROOT, name)
  File.read(file)
end
