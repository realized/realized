module REAL
  class Processor
    class UnparsedInstanceError < RuntimeError; end
    class NonHashTransformedElement < RuntimeError; end

    MULTIPLES = {
      definition: :definitions,
    }

    def initialize(file)
      @file = file
      @parser = Parser.new(@file)
      @transformer = Transformer.new
    end

    def parse
      @tree = @parser.parse
      @output = @transformer.apply(@tree)
    end

    # Since the Transformer output is rather wild
    # (an array of occurrence-hashes), we will turn it
    # into a useful internal representation
    def contain
      raise UnparsedInstanceError unless @output
      array_keys = MULTIPLES.keys
      @internal = @output.reduce({}) do |internal, occurrence|
        if !occurrence.is_a?(Hash)
          raise NonHashTransformedElementError
        elsif key = occurrence.keys.any_included(array_keys)
          internal.array_assoc!(MULTIPLES[key], occurrence[key])
        else
          key = occurrence.keys.first
          internal[key] = occurrence[key]
        end
        internal
      end
    end

  end
end
