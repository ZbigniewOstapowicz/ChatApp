const audioSpriteWebpackPlugin = require('audiosprite-webpack-plugin');
const needInSounds = true;

const configAudio = {
  plugins: [
    new audioSpriteWebpackPlugin.Plugin({
      audiosprite: {
        output: 'audioSpriteName',
        export: 'mp3,ogg,ac3,m4a,caf',
        bitrate: 64
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(mp3|wav)$/,
        include: /(sounds)/,
        loader: audioSpriteWebpackPlugin.loader,
    
      },
      {
        test: /audioSpriteName\.(mp3|ogg|ac3|m4a|caf)$/,
        exclude: /(sounds)/,
        loader: 'file-loader'
      }
    ]
  }
};

module.exports = configAudio;