require_relative 'loader.rb'

#######################################################################
#                          Application Portion                        #
#                                                                     #
#######################################################################

REAL_TEST_FILE = APP_ROOT.join('test/fixtures/reversible_circuit.real')

begin
  parsed = REAL::Parser.new.parse(REAL_TEST_FILE.read)
  puts parsed
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
