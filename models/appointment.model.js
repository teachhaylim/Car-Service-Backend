import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { paginate, toJSON } from "./plugins";

const appointmentSchema = mongoose.Schema(
    {
        userId: {
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
        services: {
            type: [mongoose.Types.ObjectId],
            ref: "services",
            required: true,
            autopopulate: true,
        },
        status: {
            type: Array,
            default: [],
        },
        totalAmount: {
            type: Number,
            min: 0,
            default: 0,
        },
        remark: {
            type: String,
            default: "",
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

appointmentSchema.plugin(mongooseAutoPopulate);
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

export default mongoose.model("appointments", appointmentSchema);