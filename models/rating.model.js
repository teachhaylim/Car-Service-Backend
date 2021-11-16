import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { paginate, toJSON } from "./plugins";

const ratingSchema = mongoose.Schema(
    {
        level: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
            max: 5,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
            autopopulate: true,
        },
        sellCompany: {
            type: mongoose.Types.ObjectId,
            ref: "shops",
            required: true,
            autopopulate: true,
        },
        remark: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

ratingSchema.plugin(toJSON);
ratingSchema.plugin(paginate);
ratingSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("ratings", ratingSchema);