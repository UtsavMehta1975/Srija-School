module.exports = {
  apps: [{
    name: 'genesis-school-api',
    script: 'server.js',
    cwd: '/var/www/genesis-school',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/genesis-school-api-error.log',
    out_file: '/var/log/pm2/genesis-school-api-out.log',
    log_file: '/var/log/pm2/genesis-school-api-combined.log',
    time: true
  }]
};





