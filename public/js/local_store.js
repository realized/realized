var startsWith = function(string, should_start_with) {
  var portion = string.slice(0, should_start_with.length);
  return portion === should_start_with;
};

var LocalStore = function(prefix) {
  if (prefix) {
    this.prefix = prefix;
  }
};

var local_store_functions = {
  prefixed: function(key) {
    if (this.prefix) {
      return this.prefix+":"+key;
    } else {
      return key;
    }
  },

  store: function(key, data) {
    var json_data = JSON.stringify(data);
    localStorage.setItem(this.prefixed(key), json_data);
    return json_data;
  },

  retrieve: function(key) {
    return this.retrieve_raw(this.prefixed(key));
  },

  retrieve_raw: function(raw_key) {
    var json_data = localStorage.getItem(raw_key);
    return json_data && JSON.parse(json_data);
  },

  keys: function() {
    var key_count = localStorage.length;
    var keys = [];
    for (var i = 0; i < key_count; i++) {
      var key = localStorage.key(i);
      if (!this.prefix || this.prefix && startsWith(key, this.prefix))
        keys.push(key);
    }
    return keys;
  },
};

for (var key in local_store_functions) {
  if (local_store_functions.hasOwnProperty(key))
    LocalStore.prototype[key] = local_store_functions[key];
}

window.LocalStore = LocalStore;
