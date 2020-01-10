const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        authHostSvc: JSON.stringify(process.env.SERVICE_AUTH_HOST_URL),
        taskHostSvc: JSON.stringify(process.env.SERVICE_TASK_HOST_URL),
      }
    })
  ]
};
