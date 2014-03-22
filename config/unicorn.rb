$SAFE = 0
app_name = 'realized'
app_root = "/var/srvd/applications/#{app_name}"

working_directory app_root
pid File.join(app_root, "/tmp/pids/unicorn_#{app_name}.pid")
stderr_path File.join(app_root, "/tmp/unicorn.log")
stdout_path File.join(app_root, "/tmp/unicorn.log")

listen "/tmp/unicorn.#{app_name}.sock"
worker_processes 2
timeout 30
