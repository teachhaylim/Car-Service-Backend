import mongoose from "mongoose";
import { toJSON } from "./plugins";
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

/**
 * 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;

    return bcrypt.compare(password, user.password);
}

/**
 * User Model Instance
 * @typedef User
 */
export default mongoose.model("user", userSchema);