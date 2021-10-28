import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { paginate, toJSON } from "./plugins";

const serviecSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        sellCompany: {
            type: mongoose.Types.ObjectId,
            ref: "shops",
            autopopulate: true,
            required: true,
            private: false, //will change in the future
        },
        price: {
            type: Number,
            default: 0,
        },
        // addOn: {
        //     type: Array,
        //     default: [],
        // },
        remark: {
            type: String,
            default: "",
            trim: true,
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

serviecSchema.plugin(mongooseAutoPopulate);
serviecSchema.plugin(toJSON);
serviecSchema.plugin(paginate);

export default mongoose.model("services", serviecSchema);