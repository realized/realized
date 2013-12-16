require_relative 'loader.rb'

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
