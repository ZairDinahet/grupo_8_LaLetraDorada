const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/img/products'))
    },

    filename: function (req, file, cb) {
      const newFilename = `book-${Date.now()}${path.extname(file.originalname)}` 
      cb(null,newFilename)
    }
})

const upload = multer({ storage })


module.exports = upload
