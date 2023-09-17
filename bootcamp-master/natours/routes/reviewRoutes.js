const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /tour/32423/reviews
// GET /tour/32423/reviews
// POST /reviews

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user', 'admin'),
        reviewController.createReview,
    );

router
    .route('/:id')
    .delete(reviewController.deleteReview);

module.exports = router;
