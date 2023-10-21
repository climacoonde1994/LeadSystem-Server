const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const multer = require('multer')



// Start by creating some disk storage options:
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
// Set saved storage options:
const upload = multer({ storage: storage })

router.post("/", upload.array("files"), (req, res) => {
    res.json({ message: "File(s) uploaded successfully" });
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

router.get('/file/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ err: 'No file exists' });
      }
  
      // If file exists
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
});

module.exports = router ;