import { User } from "../models/user.models.js";
import { Captain } from "../models/captain.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async(req, res, next) =>{
    try {
        // Extract the token from cookies or authorization header
        const accessToken = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");

        if(!accessToken){
            throw new ApiError(401, "unauthorized request");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        } catch (err) {
            throw new ApiError(401, err.name === "TokenExpiredError" ? "Token has expired" : "Invalid token");
        }

        // Fetch the user and exclude the password field
        const user = await User.findById(decodedToken?._id).select("-password")

        const captain = await Captain.findById(decodedToken?._id).select("-password");

        if(!user && !captain){
            throw new ApiError(401,"Invalid access token")
        }

        if(user && !captain){
            req.user = user;
            next()
        }
        else if(captain && !user){
            req.captain = captain;
            next()
        }

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access to token")
    }
})