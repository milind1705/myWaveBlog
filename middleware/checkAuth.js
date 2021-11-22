const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
   try {
    const {authorization} = req.headers;
    const token  = req.cookies.access_token || authorization.replace("Bearer ", "");
    console.log(token)
   
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.payload = decoded;
    next();
   } catch (err){
       return res.status(401).json({
           message: "Unauthorized"
       })
   }
} 