import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import logger from "./logger";

dotenv.config({ path: path.join(__dirname, "../.env") });

const configSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_URL: Joi.string().required().description("MongoDB Connection String"),
    JWT_SECRET: Joi.string().required().description("JWT Secret key"),
    JWT_EXPIRATION_DAYS: Joi.number().default(7).description("days after which refresh tokens expire"),
}).unknown();

const { value: configVars, error } = configSchema.prefs({ errors: { label: "key" } }).validate(process.env);

//FIXME log in console but not save to file
if (error) {
    let message = `Config validation error: ${error.message}`;

    logger.error("config error");
    throw new Error(message);
}

/**
 * * Initialize general config values
 * 
 * @returns {object} Gneral Config
 * @public
*/
export default {
    env: configVars.NODE_ENV,
    port: configVars.PORT,
    mongoose: {
        url: configVars.DB_URL,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        secret: configVars.JWT_SECRET,
        expirationDays: configVars.JWT_EXPIRATION_DAYS,
    }
};