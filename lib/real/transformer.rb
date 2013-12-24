module REAL
  class Transformer < Parslet::Transform

    rule(:word => subtree(:word)) do
      word.to_s
    end

    rule(:gate => subtree(:name), :params => subtree(:params)) do
      {gate_name: name.to_s, params: params}
    end

    rule(:matrix_slot => subtree(:slot)) do
      slot.to_s
    end

    rule(:variable_count => subtree(:count)) do
      {variable_count: count.to_i}
    end

    rule(:version => subtree(:val)) do
      {version: val.to_f}
    end

    rule(:cost => subtree(:cost)) do
      {cost: cost.to_i}
    end

    rule(:description => subtree(:description)) do
      {description: description.to_s}
    end

    rule(:definition => subtree(:definition)) do
      declared_def = {definition: {
        declaration: definition.shift,
        gates: definition.select { |h| h.has_key?(:gate_name) },
      }}
      cost = definition.select { |h| h.has_key?(:cost) }.first
      declared_def[:definition][:cost] = cost[:cost] if cost
      description = definition.select { |h| h.has_key?(:description) }.first
      declared_def[:definition][:description] = description[:description] if description
      declared_def
    end

  end
end
