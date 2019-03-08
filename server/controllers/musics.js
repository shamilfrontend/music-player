const fs = require('fs');

module.exports.getMusics = function (req, res) {
  const musicFromFolder = fs.readdirSync('./static/musics');
  const musics = musicFromFolder.map(item => `/static/musics/${item}`);

  return res.json({
    musics,
  });
};

module.exports.addMusics = function (req, res) {
};
