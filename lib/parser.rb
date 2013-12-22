module REAL
  class Parser < Parslet::Parser

    # Building Block rules #
    ########################

    rule(:space) { str(' ').repeat }
    rule(:dot) { str('.') }
    rule(:any_in_line) { match('[^\n]') }
    rule(:number) { match('[0-9]').repeat(1) }
    rule(:word) { match('[0-9a-zA-z]').repeat(1) }
    rule(:circuit_name) { match('[0-9a-zA-z+]').repeat(1) }
    rule(:string) { match('"') >> match('[^"]').repeat(1) >> match('"') }
    rule(:significant_number) { number >> dot >> number }
    rule(:line_end) { space >> (str("\r\n") | str("\n") | str("\r")) }
    rule(:empty) { space >> line_end }

    rule(:word_end) { word >> (space | line_end.present?) }
    rule(:string_end) { string >> (space | line_end.present?) }

    rule(:variable_names) { (word_end | string_end).repeat(1) }
    rule(:input_values) { (word_end | string_end).repeat(1) }
    rule(:output_values) { (word_end | string_end).repeat(1) }

    rule(:matrix) { match('[-01]').repeat(1) }

    rule(:row) { circuit_name >> space >> word_end.repeat(1) >> line_end }

    # Specific Parts - Rules #
    ##########################

    rule(:comment) do
      str('#') >>
        any_in_line.repeat >>
      line_end
    end

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

    rule(:inputbus) do
      str('.inputbus') >>
        space >>
        (word_end | string_end).repeat(1) >>
      line_end
    end

    rule(:outputbus) do
      str('.outputbus') >>
        space >>
        (word_end | string_end).repeat(1) >>
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
    rule(:end_content) { str('.end') >> line_end.maybe }

    rule(:content) do
      begin_content >>
      (row | comment).repeat >>
      end_content
    end

    rule(:begin_definition) do
      str('.define') >> space >> row
    end

    rule(:cost) do
      str('.cost') >>
        space >>
        number >>
      line_end
    end

    rule(:description) do
      str('.description') >>
        any_in_line.repeat >>
      line_end
    end

    rule(:definition_header) do
      cost |
      description
    end

    rule(:end_definition) do
      str('.enddefine') >> line_end
    end

    rule(:definition) do
      begin_definition >>
        (definition_header | row).repeat >>
      end_definition
    end


    # Meta-Rules #
    ##############

    rule(:header) do
      (
        version |
        numvars |
        variables |
        inputs |
        outputs |
        inputbus |
        outputbus |
        constants |
        garbage |
        comment |
        content |
        definition |
        empty
      ).repeat
    end

    rule(:body) { content }

    # meta-rule that "puts it all together"
    rule (:file) { header }

    # root rule, start parsing here
    root(:file)

  end
end
