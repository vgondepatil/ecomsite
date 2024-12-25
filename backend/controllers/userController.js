import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Debug logging
        console.log('Attempting seller login:', { email });

        // Validate input
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find seller with explicit role check
        const seller = await userModel.findOne({ email, role: 'seller' });
        
        // Debug logging
        console.log('Seller found:', seller ? 'Yes' : 'No');

        if (!seller) {
            return res.json({
                success: false,
                message: "Seller not found with this email"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, seller.password);
        
        // Debug logging
        console.log('Password match:', isMatch ? 'Yes' : 'No');

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: seller._id, role: 'seller' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from seller object
        const sellerData = seller.toObject();
        delete sellerData.password;

        res.json({
            success: true,
            message: "Login successful",
            token,
            seller: sellerData
        });

    } catch (error) {
        console.error('Seller login error:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Add this to your userController.js
const registerSeller = async (req, res) => {
    try {
        const { name, email, password, businessName, phone } = req.body;

        // Validate input
        if (!name || !email || !password || !businessName || !phone) {
            return res.json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res.json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        // Check if seller already exists
        const existingSeller = await userModel.findOne({ email });
        if (existingSeller) {
            return res.json({ 
                success: false, 
                message: "Email already registered" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new seller with explicit role
        const newSeller = new userModel({
            name,
            email,
            password: hashedPassword,
            businessName,
            phone,
            role: 'seller'
        });

        await newSeller.save();

        res.json({ 
            success: true, 
            message: "Seller registered successfully" 
        });

    } catch (error) {
        console.error('Seller registration error:', error);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Add this new function to get seller profile
const getSellerProfile = async (req, res) => {
    try {
        // Get seller ID from the authenticated token
        const sellerId = req.body.userId;

        // Find seller by ID and exclude password from the response
        const seller = await userModel.findById(sellerId)
            .select('-password');

        if (!seller || seller.role !== 'seller') {
            return res.json({
                success: false,
                message: "Seller not found"
            });
        }

        res.json({
            success: true,
            seller
        });

    } catch (error) {
        console.error('Get seller profile error:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { loginUser, registerUser, adminLogin, loginSeller, registerSeller, getSellerProfile }


// export { loginUser, registerUser, adminLogin,loginSeller,registerSeller }