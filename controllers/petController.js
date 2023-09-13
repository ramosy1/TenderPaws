const Category = require('../models/categoryModel.js');
const Pet = require('../models/petModel.js');
const multer = require('multer');

// multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


const home = function (req, res) {
    res.render('pages/index', { user: req.user });
}

const about = function (req, res) {
    res.render('pages/about-us', { user: req.user });
}

const getInvolved = function (req, res) {
    res.render('pages/get-involved', { user: req.user });
}

const getPetCategories = function (req, res) {
    res.render('pages/adopt-categories', { user: req.user });
}

const getAllDogs = async (req, res) => {
    try {
        const limitNumber = 20;
        const dogs = await Pet.find({ 'category': 'Dogs' }).populate('owner').limit(limitNumber);
        res.render('pages/dogs', { pets: dogs, user: req.user });
    } catch (err) {
        console.log(err);
    }
};

const getAllCats = async (req, res) => {
    try {
        const limitNumber = 20;
        const cats = await Pet.find({ 'category': 'Cats' }).populate('owner').limit(limitNumber);
        res.render('pages/cats', { pets: cats, user: req.user });
    } catch (err) {
        console.log(err);
    }
};

const getAllOthers = async (req, res) => {
    try {
        const limitNumber = 20;
        const others = await Pet.find({ 'category': 'Others' }).populate('owner').limit(limitNumber);
        res.render('pages/others', { pets: others, user: req.user });
    } catch (err) {
        console.log(err);
    }
};

const getAllPets = async (req, res) => {
    try {
        const limitNumber = 20;
        const pets = await Pet.find().populate('owner').limit(limitNumber);
        res.render('pages/pets', { pets: pets, user: req.user });
    } catch (err) {
        console.log(err);
    }
}

const uploadPage = (req, res) => {
    res.render('pages/upload', { user: req.user });
};

const createPet = async (req, res) => {
    try {
        const pet = new Pet({
            name: req.body.name,
            category: req.body.category,
            breed: req.body.breed,
            status: req.body.status,
            sex: req.body.sex,
            weight: req.body.weight,
            age: req.body.age,
            microchip: req.body.microchip,
            image: req.file.filename, // multer places the file info in req.file
            owner: req.user._id
        });

        await pet.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

const editPage = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        res.render('pages/edit', { pet: pet, user: req.user });
    } catch (err) {
        console.log(err);
    }
};

const updatePet = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        let pet = await Pet.findById(req.params.id);
            if(pet.owner.equals(req.user._id)){
                await Pet.findByIdAndUpdate(req.params.id, req.body);
            }
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

const deletePet = async (req, res) => {
    try {
        let pet = await Pet.findById(req.params.id);
            if(pet.owner.equals(req.user._id)){
                await Pet.findByIdAndRemove(req.params.id);
            }
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    home,
    about,
    getPetCategories,
    getAllDogs,
    getAllCats,
    getAllOthers,
    getAllPets,
    getInvolved,
    upload,
    uploadPage,
    createPet,
    editPage,
    updatePet,
    deletePet
};