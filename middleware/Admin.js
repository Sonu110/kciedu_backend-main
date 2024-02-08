  const jwt = require('jsonwebtoken');
  const User = require('../Models/user');
  const keys = "kci12345#$";

  const AdminAuth = async (req, res, next) => {

  
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, keys);
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
      if (!user || !user.isAdmin) {
        console.log("the value os sdgfhi", user);
        
        return res.status(403).json({ error: 'Forbidden', success: false });
      }
      req.admin = user;
      next();
  
    } catch (error) {
      console.error("Error in AdminAuth Middleware:", error);
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }
  };

  module.exports = AdminAuth;
