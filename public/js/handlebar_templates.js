window.Template = {
  templates: {},

  fetch: function(template_name, func) {
    var template = Template.templates[template_name]
    if (template) {
      func(template);
    } else {
      $.get("templates/"+template_name+".hbs", function(data) {
        template = Handlebars.compile(data);
        Template.templates[template_name] = template;
        func(template);
      }, "text");
    }
  },

  use: function(template_name, func) {
    Template.fetch(template_name, function(template) {
      func(template);
    });
  },

};
