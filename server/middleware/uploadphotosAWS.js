const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const uploadPhotos = multer({ storage }).array("photo");

module.exports = uploadPhotos;