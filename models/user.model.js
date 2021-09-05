import mongoose from "mongoose";
import { paginate, toJSON } from "./plugins";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
}

/**
 * Check if email is taken
 * @param {string} email - The user's email
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

    next();
});

/**
 * User Model Instance
 * @typedef User
 */
export default mongoose.model("user", userSchema);