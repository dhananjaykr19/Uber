import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const captainSchema = new mongoose.Schema(
    {
        fullname : {
            firstname : {
                type : String,
                required : true,
                minlength : [3, 'Firstname must be at least 3 character long']
            },
            lastname: {
                type: String,
                minlength: [3, 'Lastname must be at least 3 characters long']
            }
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            match : [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
        },
        password : {
            type : String,
            required : true,
        },
        socketId : {
            type : String,
        },
        status : {
            type : String,
            enum : ['active', 'inactive'],
            default : 'inactive'
        },
        vehicle : {
            color : {
                type : String,
                required : true,
                minlength : [3, 'Color must be at least 3 character long'],
            },
            plate : {
                type : String,
                required : true,
                minlength : [3, 'Plate must be at least 3 character long'],
            },
            capacity : {
                type : Number,
                required : true,
                min : [1, 'Capacity must be at least 1']
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ['car', 'motorcycle', 'auto']
            }
        },
        location : {
            ltd : {
                type : Number,
            },
            lng : {
                type : Number
            }
        }
    },
    {timestamps : true}
)

captainSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

captainSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            status: this.status
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '24h'
        }
    )
}

export const Captain = mongoose.model("Captain", captainSchema)