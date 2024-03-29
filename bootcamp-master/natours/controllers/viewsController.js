const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        res.locals.alert = 'Your booking was successful! Please check your email for a confirmation. If your booking doesnt show up here immediatly, please come back later.';
    }
    next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
    // 1) Get Tour data from collection
    const tours = await Tour.find();

    // 2) Build template

    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    // 1) get the data, for the requested tour (includes reviews and guides)
    const { slug } = req.params;
    const tour = await Tour.findOne({ slug }).populate({
        path: 'reviews',
        fields: 'review rating user',
    });

    if (!tour) {
        return next(new AppError('There is no tour with that name', 404));
    }

    // 2) Build template

    // 3) Render template using data from 1)
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://js.stripe.com/v3/ https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;",
        )
        .render('tour', {
            title: `${tour.name} tour`,
            tour,
        });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "connect-src 'self' http://127.0.0.1:3000/api/v1/users/login",
        )
        .render('login', {
            title: 'Log into your account',
        });
});

exports.getAccount = (req, res) => {
    res.status(200)
        .render('account', {
            title: 'Your Account',
        });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
    // 1) Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    // 2) Find tours with the returned IDs
    const tourIDs = bookings.map((el) => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200).render('overview', {
        title: 'My Tours',
        tours,
    });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email,
    }, {
        new: true,
        runValidators: true,
    });

    res.status(200)
        .render('account', {
            title: 'Your Account',
            user: updatedUser,
        });
});
