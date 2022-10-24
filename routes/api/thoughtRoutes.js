const router = require('express').Router();
const { 
  getThoughts, 
  getOneThought, 
  createThought,
  updateThought,
  deleteThought,
  addReaction, 
  deleteReaction
} = require('../../controllers/thoughtController.js');

//! (/api/thoughts)
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

//! (/api/thoughts/:thoughtId)
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//! (/api/thoughts/:thoughtId/reactions/:reactionId)
router
  .route('/:thoughtId/reactions/')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;