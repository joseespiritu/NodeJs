const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();

// Only for storage on filesystem
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${Date.now()}.${ext}`);
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Not an image! Please upload only images', false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Function middleware
const resizeUserPhoto = (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
}

app.post('/', [upload.single('photo'), resizeUserPhoto], (req, res) => {
    console.log(req.file);
    console.log(req.body);

    return res.status(200).json({ msg: 'OK' });
});

app.listen(4000, () => {
    console.log(`App listen on port 4000`);
});


