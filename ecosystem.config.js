module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'app-name',
      script: 'index.js',
      ignore_watch: ['.git', 'src', 'public'],
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'username',
      host: 'deploy_host',
      port: '6900',
      ref: 'origin/master',
      repo: '',
      path: '/data/app-name',
      'post-deploy': 'npm install --production && npm run build && npm run migrate -- up --env production && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
