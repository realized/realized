require_relative '../spec_helper.rb'

describe REAL::Processor do
  describe '#parse' do

    subject(:processor) { REAL::Processor.new(fixture_file('circuits/sym9_147.real')) }

    context "successfully parses a complex real-style file" do
      it { should parse_successfully }
    end

    context "creates a tree-representation" do
      it "that is not nil" do
        processor.parse
        expect(processor.tree).not_to be_nil
      end
    end

    context "returns a valid tree-representation" do
      it do
        pending("Like in #contain we should check a tree against a fixture")
      end
    end

  end

  describe '#contain' do

    subject(:processor) { REAL::Processor.new(fixture_file('circuits/sym9_147.real')) }

    context "produces an internal representation of the tree" do
      it "which should match the fixture" do
        processor.parse
        expect(processor.contain).to eq({
          :version=>1.0,
          :variable_count=>12,
          :variables => ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "s2", "s3", "s4"],
          :inputs => ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "0", "0", "0"],
          :outputs => ["g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "s"],
          :constants => ["-", "-", "-", "-", "-", "-", "-", "-", "-", "0", "0", "0"],
          :garbage => ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "-"],
          :definitions => [
            {:declaration=>{:gate_name=>"p", :params=>["a", "b", "c"]},
             :gates=>
               [{:gate_name=>"t", :params=>["a", "b", "c"]},
                {:gate_name=>"t", :params=>["a", "b"]}],
             :cost=>4,
             :description=>" Peres gate"}],
          :circuit => [
            {:gate_name=>"p", :params=>["x1", "x2", "s2"]},
            {:gate_name=>"t3", :params=>["x3", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x2", "x3", "s2"]},
            {:gate_name=>"t3", :params=>["x4", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x4", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x3", "x4", "s2"]},
            {:gate_name=>"t3", :params=>["x5", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x5", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x4", "x5", "s2"]},
            {:gate_name=>"t3", :params=>["x6", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x6", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x5", "x6", "s2"]},
            {:gate_name=>"t3", :params=>["x7", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x7", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x6", "x7", "s2"]},
            {:gate_name=>"t3", :params=>["x8", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x8", "s2", "s3"]},
            {:gate_name=>"p", :params=>["x7", "x8", "s2"]},
            {:gate_name=>"t3", :params=>["x9", "s3", "s4"]},
            {:gate_name=>"t3", :params=>["x9", "s2", "s3"]},
            {:gate_name=>"t2", :params=>["s3", "s4"]}]})
      end
    end

  end
end
