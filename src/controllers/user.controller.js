import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler( async(req, res) =>{
    // console.log("Received data:", req.body);
    // get user details from frontend or data
    const { fullname, email, password, } = req.body;

    // validation of email and password
    if (
        [email, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required.")
    }

    // checking firstname should be at least 3 character long
    if(!fullname?.firstname || fullname.firstname.trim().length < 3){
        throw new ApiError(400, 'First name must be at least 3 characters long');
    }

    // checking if lastname is exist then it should be at least 3 character long 
    if(fullname?.lastname && fullname.lastname.trim().length < 3){
        throw new ApiError(400, 'Last name must be at least 3 characters long.');
    }
    // checking user alredy exist or not
    const existUser = await User.findOne({email});
    if(existUser){
        throw new ApiError(400, "User already exists with this email.");
    }

    if(password.trim().length < 6){
        throw new ApiError(400, 'password must be at least 6 characters long.')
    }

    // checking user already exist or not
    const userExist = await User.findOne({email});
    
    if(userExist){
        throw new ApiError(409, "email alreay exists");
    }

    // creating user
    const user = await User.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname || ""
        },
        email,
        password
    })
    const token = user.generateAuthToken();

    const createdUser = await User.findById(user._id).select("-password");
    // return response
    return res.status(201).json(
        new ApiResponse(200,token, createdUser, "User registered Successfully")
    )
})

const genAuthToken  = async (userId) => {
    try {
        const user = await User.findById(userId);
        const authToken = user.generateAuthToken();
        user.authToken = authToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
}

const loginUser = asyncHandler( async(req, res) => {
    // data from req body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // if user is not avialable 
    if(!user){
        throw new ApiError(404, "user not found");
    }

    // checking password 
    const passwordMatch = await user.comparePassword(password);

    // checking password match or not
    if(!passwordMatch){
        throw new ApiError(401, "Invalid password");
    }

    // Generate auth token
    const token = user.generateAuthToken();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    }

    return res
    .status(201)
    .cookie("token", token, options)
    .json(
        new ApiResponse(
            200, 
            { 
                user: { 
                    _id: user._id, 
                    email: user.email, 
                    fullname: user.fullname 
                }, 
                token,
            }, 
            "User logged in successfully."
        )
    );
})
export { registerUser, loginUser };