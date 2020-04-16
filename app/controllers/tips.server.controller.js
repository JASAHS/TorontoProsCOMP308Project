const mongoose = require('mongoose');
const Tips = require('mongoose').model('Tips');

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

exports.create = function (req, res) {
    const tips = new Tips();
    tips.tip = req.body.tip;
    
    console.log(req.body)
    tips.save((err) => {
      if (err) {
          console.log('error', getErrorMessage(err))

          return res.status(400).send({
              message: getErrorMessage(err)
          });
      } else {
          res.status(200).json(tips);
      }
  });
};

exports.list = function (req, res, next) {
	Tips.find({}, function (err, tips) {
		if (err) {
			return next(err);
		} else {
			res.json(tips);
		}
	});
};