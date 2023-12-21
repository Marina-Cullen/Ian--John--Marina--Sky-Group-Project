const IdeaModel = require('../models/IdeaModel');

const IdeaController = {
  // Create
createIdea: async (req, res) => {
    try {
    const { ideas, userId } = req.body;
    let image = null;
    if (req.file) {
        image = req.file.path;
    }

    const newIdea = await IdeaModel.create({
        ideas,
        image,
        userId
    });

    res.status(201).json(newIdea);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
},

  // Show all idea
getAllIdeas: async (req, res) => {
    try {
    const ideas = await IdeaModel.findAll();
    res.status(200).json(ideas);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
},

  //Show one Idea from one id
getIdeaById: async (req, res) => {
    try {
    const idea = await IdeaModel.findByPk(req.params.id);
    if (idea) {
        res.status(200).json(idea);
    } else {
        res.status(404).json({ message: 'Idea not found' });
    }
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
},

  // Update an idea by ID
updateIdea: async (req, res) => {
    try {
    const { ideas } = req.body;
    let image = null;
    if (req.file) {
        image = req.file.path; // for multer
    }

    const updatedIdea = await IdeaModel.update({ ideas, image }, {
        where: { id: req.params.id },
        returning: true // for MySQL, you'd need to re-query the DB
    });

    res.status(200).json(updatedIdea);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
},

  // Delete by id
deleteIdea: async (req, res) => {
    try {
    await IdeaModel.destroy({
        where: { id: req.params.id }
    });

    res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}
};

module.exports = IdeaController;
