import mongoose from "mongoose";

const serviecSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        sellCompany: {
            type: mongoose.Types.ObjectId,
            refs: "shop",
            //TODO add auto populate feature
        },
        price: {
            type: Number,
            required: true,
        },
        remark: {
            type: String,
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

export default mongoose.model("service", serviecSchema);