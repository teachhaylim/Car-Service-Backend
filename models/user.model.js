import mongoose from "mongoose";
import { paginate, toJSON } from "./plugins";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            maxlength: 10,
            trim: true,
            unique: true,
        },
        dob: {
            type: Date,
            default: "",
        },
        profilePic: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            private: true,
        },
        type: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check password
 * @param {String} password 
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
}

/**
 * Check if email is taken
 * @param {String} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    if (this.isModified('profilePic')) {
        this.profilePic = `https://avatars.dicebear.com/api/identicon/${this.firstName}.svg`;
    }

    next();
});

/**
 * User Model Instance
 * @typedef User
 */
export default mongoose.model("users", userSchema);