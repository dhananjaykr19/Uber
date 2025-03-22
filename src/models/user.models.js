import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        fullname : {
            firstname : {
                type : String,
                required : true,
                minlength : [3, 'first name must be at least 3 character']
            },
            lastname : {
                type : String,
                minlength : [3, 'lastname must be at least 3 character ']
            }
        },
        email : {
            type : String,
            required : true,
            unique : true,
            minlength : [6, 'email must be at least 6 character']
        },
        password : {
            type : String,
            required : true
        },
        // for live location 
        socketId :{
            type : String
        }
    },
    {timestamps : true}
)

// Hash password before saving
userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    )
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);