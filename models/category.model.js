import mongoose from "mongoose";
import { paginate, toJSON } from "./plugins";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            // unique: true,
        },
        remark: {
            type: String,
            trim: true,
            default: "",
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

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if name is existed
 * @param {String} name - The category's name
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isNameTaken = async function (name) {
    const category = await this.findOne({ name });
    return !!category;
};

export default mongoose.model("categories", categorySchema);