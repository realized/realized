var swap_in_array = function(array, index, target_index) {
  // results in noop if index out-of-bounds or indices equal.
  if( Math.max(index, target_index) < array.length && index != target_index ) {
    other = array.splice(index, 1, array[target_index]);
    array.splice(target_index, 1, other[0]);
  }
};

var Circuit = function(circuit_data) {
  this.filename = circuit_data.filename;
  this.raw = circuit_data.raw;
  this.source = circuit_data.source;
  this.data = circuit_data.circuit;
};

var circuit_functions = {

  columns: function() {
    return this.data.circuit;
  },

  columns_count: function() {
    return this.columns().length;
  },

  rows_count: function() {
    return this.rows().length;
  },

  rows: function() {
    return this.data.variables;
  },

  gates_count: function() {
    return this.gates().length;
  },

  gates: function() {
    return this.columns();
  },

  lines_count: function() {
    return this.lines().length;
  },

  lines: function() {
    return this.rows();
  },

  gate_at: function(index) {
    return this.gates()[index];
  },

  gate_index: function(gate) {
    return jQuery.inArray(gate, this.gates());
  },

  line_at: function(index) {
    return this.lines()[index];
  },

  line_index: function(line) {
    return jQuery.inArray(line, this.lines());
  },

  version: function() {
    return this.data.circuit.version;
  },

  reposition_gate: function(gate, target_index) {
    swap_in_array(this.gates(), gate_index(gate), target_index);
  },

  store: function(store) {
    this.version()++;
    this.update_raw_data(function(self) {
      store.store(self.filename, self.serialize_yourself());
    };
  },

  serialize_yourself: function() {
    return {
      filename: this.filename,
      raw: this.raw,
      source: this.source,
      circuit: this.data,
    };
  },

  update_raw_data: function(callback) {
    var self = this;
    $.post('/export', self.data, function(response) {
      self.raw = response.raw;
      self.source = response.source;
      callback(self);
    });
  },

};

for (var key in circuit_functions) {
  if (circuit_functions.hasOwnProperty(key))
    Circuit.prototype[key] = circuit_functions[key];
}

window.Circuit = Circuit;
