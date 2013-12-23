RSpec::Matchers.define :parse_successfully do
  output = ""
  error = nil
  match_for_should do |parser|
    # expect { parser.parse }.not_to raise_error
    successful = true
    begin
      parser.parse
    rescue Parslet::ParseFailed => failure
      error = failure
      successful = false
    end
    successful
  end

  failure_message_for_should do |actual|
    "expected no error being raised, but got #{error.class}\n"+
      "with tree:\n" + error.cause.ascii_tree
  end

  match_for_should_not do |parser|
    successful = false
    begin
      parser.parse
    rescue Parslet::ParseFailed => failure
      successful = true
    rescue StandardError => failure
      error = failure
    end
    successful
  end

  failure_message_for_should_not do |actual|
    "expected Parslet::ParseFailed being raised.\n"+
    if error
      "Instead #{error.class} was raised. The message was:\n#{error.message}"
    else
      "But no error was raised."
    end
  end

end
