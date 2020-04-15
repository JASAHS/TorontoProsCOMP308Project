const mongoose = require('mongoose');
const Signs = require('mongoose').model('Signs');
const User = require('mongoose').model('User');

//function for displaying
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
//creation of the vital signs for user
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
exports.findWithUser = function(req, res) {
    console.log(req.params.userIds);
    Signs.find({ creator:req.params.userIds})
      .then(signs => res.json(signs))
      .catch(err => res.status(400).json(err));
      
  };

//reading of the vital signs
exports.read = function (req, res) {
    res.status(200).json(req.signs);
};

//retreival of the vital signs by param
exports.signsByID = function (req, res, next, id) {
    console.log("recahed signsByID");
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

//delete the vital signs
exports.destroy = function(req, res) {
    Signs.findByIdAndDelete(req.params.id)
      .then(() => res.json("sign deleted"))
      .catch(err => res.status(400).json("Error => " + err));
  };



