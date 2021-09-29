import moment from "moment";

export const fileType = ['image/jpeg', 'image/png'];

/**
 * Get Current Time as formatted string
 * @returns {String}
 */
export const LogCurrentTime = () => moment().format("YYYY-MM-DD hh:mm:ss A");

/**
 * Check for supported file type
 * @param {Array} data 
 * @returns 
 */
export function checkFileType(data) {
    if (Array.isArray(data)) return data.filter(p => !fileType.includes(p.type)).length == 0 ? false : true;

    return !fileType.includes(data.mimetype);
};

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
