const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
const User = require ("../models/User")

// signup endpoint logic 
exports.signup = async (req, res) =>{
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({message: "User aleady Exists, please login"});
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({email, password:hashed});

    // const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
    // res.json(token);
}

// Login Endpoint Logic


exports.login = async (req, res) =>{
    const { email, password} = req.body;

    const user = await User.findOne({email});
    if (!User) return res.status(404).json({message: "User Does not exist"});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({message: "incorrect password"},{expiresIn:'1d'});

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
    res.json(token);
}



