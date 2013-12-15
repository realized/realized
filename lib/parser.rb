module REAL
  class Parser < Parslet::Parser

    # Building Block rules #
    ########################

    rule(:space) { str(' ') }
    rule(:dot) { str('.') }
    rule(:number) { match('[0-9]').repeat(1) }
    rule(:significant_number) { number >> dot >> number }
    rule(:line_end) { str("\n") }

    # Specific Parts - Rules #
    ##########################

    rule(:version) do
      str('.version') >>
        space >>
        significant_number >>
      line_end
    end

    # Meta-Rules #
    ##############

    # meta-rule that "puts it all together"
    rule (:file) { version >> rest.repeat }

    # catch-all rule, only for debugging/testing purposes
    rule(:rest) { match(".|\n") }

    # root rule, start parsing here
    root(:file)

  end
end
