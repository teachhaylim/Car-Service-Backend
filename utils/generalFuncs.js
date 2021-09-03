import moment from "moment";

/**
 * @public Get Current Time as formatted string
 * @returns "YYYY-MM-DD hh:mm:ss A"
 */
export const LogCurrentTime = () => moment().format("YYYY-MM-DD hh:mm:ss A");