import mongoose from "mongoose";
import { paginate, toJSON } from "./plugins";
import mongooseAutoPopulate from "mongoose-autopopulate";

const addressSchema = mongoose.Schema(
    {
        house: {
            type: String,
            required: true,
            trim: true,
        },
        street: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        zipCode: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

addressSchema.plugin(mongooseAutoPopulate);
addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);

export default mongoose.model("address", addressSchema);