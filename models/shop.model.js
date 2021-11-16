import mongoose from "mongoose";
import { paginate, toJSON } from "./plugins";
import mongooseAutoPopulate from "mongoose-autopopulate";

const shopSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        logo: {
            type: String,
            default: "",
        },
        categories: {
            type: [mongoose.Types.ObjectId],
            ref: "categories",
            default: [],
            required: true,
            autopopulate: true,
        },
        address: {
            type: mongoose.Types.ObjectId,
            ref: "address",
            default: "",
            required: true,
            autopopulate: true,
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

shopSchema.plugin(mongooseAutoPopulate);
shopSchema.plugin(toJSON);
shopSchema.plugin(paginate);

export default mongoose.model("shops", shopSchema);