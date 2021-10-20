import moment from "moment";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { paginate, toJSON } from "./plugins";

const subServiceSchema = mongoose.Schema(
    {
        appointment: {
            type: mongoose.Types.ObjectId,
            ref: "services",
            required: true,
            autopopulate: true,
        },
        date: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

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
            type: [subServiceSchema],
            required: true,
            ref: "services",
            required: true,
            autopopulate: true,
        },
        status: {
            type: Array,
            default: [
                { date: moment().toDate(), type: 1 },
            ],
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

subServiceSchema.plugin(mongooseAutoPopulate);
subServiceSchema.plugin(toJSON);
subServiceSchema.plugin(paginate);

appointmentSchema.plugin(mongooseAutoPopulate);
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

export default mongoose.model("appointments", appointmentSchema);