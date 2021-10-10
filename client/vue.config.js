import dotenv from "dotenv";
dotenv.config();

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: process.env.SERVER_ADDRESS,
        },
      },
    },
  },
};
