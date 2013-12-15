module REAL
  class Parser < Parslet::Parser

    # Building Block rules #
    ########################

    rule(:space) { str(' ') }
    rule(:dot) { str('.') }
    rule(:number) { match('[0-9]').repeat(1) }
    rule(:word) { match('[0-9a-zA-z]').repeat(1) }
    rule(:significant_number) { number >> dot >> number }
    rule(:line_end) { str("\n") }

    rule(:word_end) { word >> (space | line_end.present?) }

    rule(:variable_names) { word_end.repeat(1) }
    rule(:input_values) { word_end.repeat(1) }
    rule(:output_values) { word_end.repeat(1) }

    rule(:matrix) { match('[-01]').repeat(1) }

    rule(:row) { word_end.repeat(1) >> line_end }

    # Specific Parts - Rules #
    ##########################

    rule(:version) do
      str('.version') >>
        space >>
        significant_number >>
      line_end
    end

    rule(:numvars) do
      str('.numvars') >>
        space >>
        number >>
      line_end
    end

    rule(:variables) do
      str('.variables') >>
        space >>
        variable_names >>
      line_end
    end

    rule(:inputs) do
      str('.inputs') >>
        space >>
        input_values >>
      line_end
    end

    rule(:outputs) do
      str('.outputs') >>
        space >>
        output_values >>
      line_end
    end

    rule(:constants) do
      str('.constants') >>
        space >>
        matrix >>
      line_end
    end

    rule(:garbage) do
      str('.garbage') >>
        space >>
        matrix >>
      line_end
    end

    rule(:begin_content) { str('.begin') >> line_end }
    rule(:end_content) { str('.end') >> line_end }

    rule(:content) do
      begin_content >>
      row.repeat >>
      end_content
    end


    # Meta-Rules #
    ##############

    # meta-rule that "puts it all together"
    rule (:file) do
      version >>
      numvars >>
      variables >>
      inputs >>
      outputs >>
      constants >>
      garbage >>
      content
    end

    # catch-all rule, only for debugging/testing purposes
    rule(:rest) { match(".|\n") }

    # root rule, start parsing here
    root(:file)

  end
end
