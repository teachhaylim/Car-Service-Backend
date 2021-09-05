import moment from "moment";

/**
 * Get Current Time as formatted string
 * @returns {string}
 */
export const LogCurrentTime = () => moment().format("YYYY-MM-DD hh:mm:ss A");

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }

        return obj;
    }, {});
};
