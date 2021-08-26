import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
    env: "development",
};

export default {
    env: "development",
};