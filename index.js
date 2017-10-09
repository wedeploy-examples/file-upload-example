const serveIndex = require('serve-index');
const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, file.originalname),
  destination: (req, file, cb) => cb(null, './public/files'),
})
const upload = multer({storage});
const app = express();
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect(`${req.protocol}://${req.get('host')}/files`);
});
app.use(express.static(__dirname + '/public'));
app.use(serveIndex('public', {'icons': true}));
app.listen(3000);