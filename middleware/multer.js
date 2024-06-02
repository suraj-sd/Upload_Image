const fs = require('fs');
const multer = require('multer');
const path = require('path')

const dir = path.join(__dirname , "../uploads");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) return cb(err);
                cb(null, dir);
            }); 
        } else {
            cb(null, dir);
        }
    },
    
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})

const upload = multer({ storage: storage });
module.exports = { upload };
