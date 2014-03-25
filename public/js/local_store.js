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
    var json_data = localStorage.getItem(this.prefixed(key));
    return json_data && JSON.parse(json_data);
  }
};

for (var key in local_store_functions) {
  if (local_store_functions.hasOwnProperty(key))
    LocalStore.prototype[key] = local_store_functions[key];
}

window.LocalStore = LocalStore;
