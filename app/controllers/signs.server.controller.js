const mongoose = require('mongoose');
// const Signs = mongoose.model('Signs');
const Signs = require('mongoose').model('Signs');
const User = require('mongoose').model('User');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const signs = new Signs();
    console.log("reached post of signs creeate")
    signs.bodyTemp = req.body.bodyTemp;
    signs.heartRate = req.body.heartRate;
    signs.bloodPressure = req.body.bloodPressure;
    signs.respiratoryRate = req.body.respiratoryRate;
    
    console.log(req.body)
    //
    //
    User.findOne({_id : req.body.user_id}, (err, user) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = user._id;
        console.log('user._id',req.id);

	
    }).then( function () 
    {
        signs.creator = req.id
        console.log('req.user._id',req.id);

        signs.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(signs);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, articles) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(articles);
    }
});
};
//
// 'userByID' controller method to find a user by its id

// exports.signsByID = function (req, res, next, id) {
//     console.log("reached params signbyid")
//     Signs.findOne({_id : id}, (err, signs) => {

//         if (err) { return getErrorMessage(err); }
//         //
//         req.signs = signs;
//         console.log('user._id',req.id);

	
//     })
//     // Signs.findById(id).exec((err, signs) => {if (err) return next(err);
//     // if (!signs) return next(new Error('Failed to load signs '
//     //         + id));
//     //     req.signs = signs;
//     //     console.log('in signsById:', req.signs)
//     //     next();
//     // });
// };
//
exports.read = function (req, res) {
    console.log("reached read")
    // res.status(200).json(req.signs);
    res.status(200).json(req.signs);
};

exports.signsByID = function (req, res, next, id) {
    console.log("recahed singyiddsdsd");
	// Use the 'User' static 'findOne' method to retrieve a specific user
	Signs.findOne({
		_id: id
	}, (err, signs) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
            // Set the 'req.user' property
            // res.status(200).json(signs);
			req.signs = signs;
			
			// Call the next middleware
			next();
		}
	});
};
//
exports.update = function (req, res) {
    console.log('in update:', req.article)
    const article = req.article;
    article.title = req.body.title;
    article.content = req.body.content;
    article.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//
exports.delete = function (req, res) {
    const article = req.article;
    article.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization: ',req.article.creator)
    console.log('in hasAuthorization: ',req.user._id)

    if (req.article.creator.id !== req.user._id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


