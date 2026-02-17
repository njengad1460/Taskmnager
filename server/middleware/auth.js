const jwt = require("jsonwebtoken");


// check token and set req.user 

exports.protect = (req, res, next) =>{
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({message:"No token given"});

    const token = auth.split(" ")[1];

    try {
        const assignUserToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = assignUserToken; //{id & role}
        next();
    } catch (error) {
        return res.status(403).json({message: "invalid token"})
        
    }
}

// checkuser role

exports.authorize = (roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) return res.status(403).json({message:"forbiden"});
        next();
    }
}