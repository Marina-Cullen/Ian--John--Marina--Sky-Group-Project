const express = require('express');
const multer = require('multer');
const IdeaController = require('../controllers/IdeaController');
const router = express.Router();

// Set up storage for file uploads
const storage = multer.diskStorage({
destination: function(req, file, cb) {
    cb(null, 'uploads/');
},
filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

const fileFilter = (req, file, cb) => {
if (file.mimetype.startsWith('image')) {
    cb(null, true);
} else {
    cb(new Error('Not an image! Please upload only images.'), false);
}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.post('/ideas', upload.single('image'), IdeaController.createIdea);
router.get('/ideas', IdeaController.getAllIdeas);
router.get('/ideas/:id', IdeaController.getIdeaById);
router.put('/ideas/:id', upload.single('image'), IdeaController.updateIdea);
router.delete('/ideas/:id', IdeaController.deleteIdea);

module.exports = router;
