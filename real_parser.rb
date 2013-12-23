require_relative 'config/loader.rb'

#######################################################################
#                          Application Portion                        #
#                                                                     #
#######################################################################

# REAL_TEST_FILE = APP_ROOT.join('test/fixtures/reversible_circuit.real')
# REAL_TEST_FILE = APP_ROOT.join('test/fixtures/circuits/hwb8_113.real')
REAL_TEST_FILE = APP_ROOT.join('test/fixtures/ryy6_256.real')

begin
  parsed = REAL::Parser.new(REAL_TEST_FILE.read).parse
  puts parsed
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
