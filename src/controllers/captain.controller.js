import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Captain } from "../models/captain.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerCaptain = asyncHandler( async(req, res) => {

    // to get user details from body
    const {email, fullname, password, vehicle } = req.body;

    // checking email and password 
    if(
        [email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required.")
    }

    // checking first is exists or length of firstname > 3 or not
    if(!fullname?.firstname || fullname.firstname.trim().length < 3){
        throw new ApiError(400, 'First name must be at least 3 characters long');
    }

    // checking if lastname is exists then its length is more then 3 or not
    if(fullname?.lastname && fullname.lastname.trim().length < 3){
        throw new ApiError(400, 'Last name must be at least 3 characters long.');
    }

    // checking on vihecle
    // 1). color checking 
    if(!vehicle?.color || vehicle.color.trim().length < 3){
        throw new ApiError(400, 'Color must be at least 3 characters long.');
    }
    // 2). plate of vihecle
    if(!vehicle?.plate || vehicle.plate.trim().length < 3){
        throw new ApiError(400, 'plate must be at least 3 characters long.');
    }
    // 3). capacity of vihecle
    if (!vehicle?.capacity || vehicle.capacity < 1) {
        throw new ApiError(400, 'Capacity must be at least 1.');
    }
    // 4). vehicle type
    if (!vehicle?.vehicleType || !['car', 'motorcycle', 'auto'].includes(vehicle.vehicleType)) {
        throw new ApiError(400, 'Invalid vehicle type.');
    }

    // Check if email is already registered
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
        throw new ApiError(400, "Email already registered.");
    }

    // Create a new captain
    const newCaptain = await Captain.create({
        email,
        fullname,
        password,
        vehicle :{
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType
        }
    });

    // Generate JWT token
    const token = newCaptain.generateAuthToken();

    // created captain
    const createdCaptain = await Captain.findById(newCaptain._id).select("-password");

    // Return response
    return res.status(201).json(
        new ApiResponse(201, { createdCaptain, token }, "Captain registered successfully.")
    );
})



export { registerCaptain }