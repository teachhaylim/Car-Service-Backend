import { pick } from "../../utils/generalFuncs";

const paginate = (schema) => {
    /**
     * @typedef {Object} QueryResult
     * @property {Document[]} results - Results found
     * @property {number} page - Current page
     * @property {number} limit - Maximum number of results per page
     * @property {number} totalPages - Total number of pages
     * @property {number} totalResults - Total number of documents
     */
    /**
     * Query for documents with pagination
     * @param {Object} [filter] - Mongo filter
     * @param {Object} [options] - Query options
     * @param {String} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @param {String} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @param {number} [options.page] - Current page (default = 1)
     * @returns {Promise<QueryResult>}
     */
    schema.statics.paginate = async function (filter, options) {
        const sortByObject = options.sortBy ? JSON.parse(options.sortBy) : {};
        const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 0;
        const skip = page * limit;
        const countPromise = this.countDocuments(filter).exec();
        let sortBy = {};
        let docsPromise = null;

        if (sortByObject) {
            sortBy = pick(sortByObject, [...Object.keys(sortByObject).filter(p => sortByObject[p])])
        }
        else {
            sortBy = { createdAt: -1 };
        }

        docsPromise = this.find(filter).sort(sortBy).skip(skip).limit(limit).exec();

        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return Promise.resolve(result);
        });
    };
};

export default paginate;
