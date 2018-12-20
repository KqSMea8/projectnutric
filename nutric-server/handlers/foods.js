const database = require("../models");

exports.getFoods = async function(req,res,next){ 
    if(req.query.foundFood.length>=3){
      try {
        let newFoundFood=req.query.foundFood.replace(/[^a-zA-Z0-9]/g,'.').toLowerCase();
        let foundFood = await database.Food.find({
          foodName_lowercase: {
              $regex:new RegExp("^("+newFoundFood+")|\\s("+newFoundFood+")")
            },
            source: "CENAN (2017 - Perú)" //developing: limitamos los resultados
          }).limit();
          return res.status(200).json(foundFood);
      } catch(error){
          return next(error);
      }
    } else {
      return res.status(200).json("");
    }
};
