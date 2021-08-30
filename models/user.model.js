import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * User Model Instance
 * @typedef User
 */
export default mongoose.model("user", userSchema);