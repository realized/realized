var store = null;

var retrieve_local_files = function() {
  return store.keys().map(store.retrieve_raw);
};

// width and height are optional
var draw = function(circuit_data, width, height){
  window.circuit = new Circuit(circuit_data);
  window.drawer = new Drawer(circuit, width, height);
  window.drawer.draw_circuit();
  window.drawer.convert_to_svg();
};

var draw_circuit = function(circuit_data, filename) {
  $('#current_file').html(filename || circuit_data.filename);
  $('#current_circuit_code pre').
    replaceWith($('<pre/>').html(circuit_data.raw));
  draw(circuit_data);
};

var recreate_file_list = function(files) {
  var file_list = $('ul#real_file_selected_files');
  file_list.html('');
  files.forEach(function(file) {
    file_list.append($('<li/>').html(file.name));
  });
}

var update_local_file_list = function() {
  var file_list = $('form#real_local_files_selector select');
  file_list.html('');
  retrieve_local_files().forEach(function(circuit) {
    var key = circuit.filename;
    file_list.append($('<option/>').html(key).val(key));
  });
};

var register_server_files_submit_hook = function() {
  $('form#real_files_selector').submit(function(e) {
    e.preventDefault();
    var file = $(this).find('select option:selected').val();
    $.get("parsed/"+file, function(data) {
      draw_circuit(data, file);
    }, "json");
  });
}

var register_upload_file_submit_hook = function() {
  var button = $('form#real_file_uploader input[type="submit"]');
  var button_value = button.val();
  $('input#real_file_select').fileupload({
    url: '/parse/',
    type: 'POST',
    dataType: 'json',
    done: function (e, data) {
      var response = data.result;
      store.store(response.filename, response);
      update_local_file_list();
      $(button).attr('value', button_value);
      draw_circuit(response);
      $('ul#real_file_selected_files li').remove();
    },
    add: function (e, data) {
      recreate_file_list(data.files);
      data.context = button.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        button_value = $(this).val();
        $(this).attr('value', 'Uploading...');
        data.submit();
      });
    }
  });
}

var register_local_files_submit_hook = function() {
  $('form#real_local_files_selector').submit(function(e) {
    e.preventDefault();
    var file = $(this).find('select option:selected').val();
    var data = store.retrieve(file);
    draw_circuit(data);
  });
};

$(document).ready(function(){
  store = new LocalStore('realized:parse');

  $.get("available_files", function(data){
    Template.use('file_selection', function(template) {
      var template_data = {
        files: data,
        local_files: retrieve_local_files(),
      };
      $("div#circuit_loading").html(template(template_data));

      register_server_files_submit_hook();
      register_upload_file_submit_hook();
      register_local_files_submit_hook();
    });
  }, "json");
});
