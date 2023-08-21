const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();

router
  .route('/')
  .get(petController.home)

router
  .route('/about-us')
  .get(petController.about)

router
  .route('/get-involved')
  .get(petController.getInvolved)

router
  .route('/adopt')
  .get(petController.getPetCategories)

  router
  .route('/adopt/dogs')
  .get(petController.getAllDogs)

  router
  .route('/adopt/cats')
  .get(petController.getAllCats)

  router
  .route('/adopt/others')
  .get(petController.getAllOthers)

router
  .route('/adopt/all-pets')
  .get(petController.getAllPets)
  
router
  .route('/upload')
  .get(petController.uploadPage)
  .post(petController.upload.single('image'), petController.createPet);

router
  .route('/edit/:id')
  .get(petController.editPage)
  .post(petController.updatePet);

router
  .route('/delete/:id')
  .post(petController.deletePet);

module.exports = router;