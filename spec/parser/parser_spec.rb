require_relative '../spec_helper.rb'

describe REAL::Parser do
  describe '#parse' do

    it "parses the simple sample real file successfully" do
      REAL::Parser.new.parse(File.read(fixture('reversible_circuit.real')))
    end

    it "fails to parse an empty file" do
      expect { REAL::Parser.new.parse('') }.to(
        raise_error(Parslet::ParseFailed))
    end

    it "successfully parses other test files" do
      expect { parse_from_path(fixture('cycle10_293.real')) }.not_to raise_error
    end

  end
end

