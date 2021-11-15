import moment from "moment";
import { Appointment, Category, Service, Shop, User } from "../models";

//Find total amount of appointments
const getTotalAppointment = async (filter = {}, sortBy = {}) => {
    const appointments = await Appointment.find(filter).sort(sortBy);

    return {
        appointments: appointments,
        total: appointments.length,
    }
};

//Find total amount of income
const getTotalIncome = async (filter = {}, sortBy = {}) => {
    const appointments = await Appointment.find(filter).sort(sortBy);
    let total = 0;
    let data = [];

    appointments.forEach((item) => {
        let tempTotal = item.services.reduce((acc, cur) => acc + cur.service.price, 0);
        total += tempTotal;
        data.push({ appointment: item, total: tempTotal });
    });

    return {
        appointments: data,
        total: total,
    };
};

//Find number of appointed service
const getCountOfAppointedServices = async (filter = {}, sortBy = {}) => {
    const appointments = await Appointment.find(filter).sort(sortBy);
    let result = [];

    appointments.forEach(item => {
        item.services.forEach((subItem, index) => {
            const data = result.filter(p => p.service == subItem.service.name)[0];

            if (data) return data.count += 1;

            result.push({ service: subItem.service.name, count: 1 });
        });
    });

    return result;
};

//Find pending appointments
const getPendingAppointments = async (filter = {}, sortBy = {}) => {
    filter["status.0.type"] = 1; //REWORK check from controller filter or always check here?

    return await Appointment.find(filter).sort(sortBy);
};

//Find canceled appointments
const getCanceledAppointments = async (filter = {}, sortBy = {}) => {
    filter["status.0.type"] = -1; //REWORK check from controller filter or always check here?

    return await Appointment.find(filter).sort(sortBy);
};

//Find completed appointments
const getCompletedAppointments = async (filter = {}, sortBy = {}) => {
    filter["status.0.type"] = 2; //REWORK check from controller filter or always check here?

    return await Appointment.find(filter).sort(sortBy);
};

//Find offered service based on shop id
const getNumberOfServicesOffered = async (filter = {}, sortBy = {}) => {
    return await Service.find(filter).sort(sortBy);
};

//Find number of appointed service by user
//FIXME bug
const getNumberOfServicesByUser = async (filter = {}, sortBy = {}) => {
    const appointments = await Appointment.find(filter).sort(sortBy);
    let users = [];

    appointments.forEach(item => {
        const user = users.filter(p => p.user._id == item.userId._id)[0];

        if (user) return user.services = [...user.services, ...item.services];

        users.push({ user: item.userId, services: item.services });
    });

    return users;
};

//Admin Dashboard section
const getTotalCategories = async (filter = {}, sortBy = {}) => {
    const categories = await Category.find(filter).sort(sortBy);

    return {
        categories: categories,
        total: categories.length,
    };
};

const getTotalShops = async (filter = {}, sortBy = {}) => {
    const shops = await Shop.find(filter).sort(sortBy);

    return {
        shops: shops,
        total: shops.length,
    };
};

const getTotalUsers = async (filter = {}, sortBy = {}) => {
    const users = await User.find(filter).sort(sortBy);

    return {
        users: users,
        total: users.length,
    };
};

const getNewlyRegisteredUsers = async (filter = {}, sortBy = {}) => {
    filter.createdAt = { $gte: moment().startOf("month").toDate(), $lte: moment().toDate() };

    const users = await User.find(filter).sort(sortBy);
    let temp = [];

    for (var i = moment().startOf("month").toDate(); i <= moment().toDate(); i.setDate(i.getDate() + 1)) {
        if (users.filter(p => moment(p.createdAt).format("YYYY-MM-DD") == moment(i).format("YYYY-MM-DD")).length > 0) {
            temp.push({
                date: moment(i).format("YYYY-MM-DD"),
                count: users.filter(p => moment(p.createdAt).format("YYYY-MM-DD") == moment(i).format("YYYY-MM-DD")).length,
            });
            continue;
        }

        temp.push({
            date: moment(i).format("YYYY-MM-DD"),
            count: 0,
        });
    }

    return temp;
};

const getNewlyRegisteredShops = async (filter = {}, sortBy = {}) => {
    filter.createdAt = { $gte: moment().startOf("month").toDate(), $lte: moment().toDate() };

    const shops = await Shop.find(filter).sort(sortBy);
    let temp = [];

    for (var i = moment().startOf("month").toDate(); i <= moment().toDate(); i.setDate(i.getDate() + 1)) {
        if (shops.filter(p => moment(p.createdAt).format("YYYY-MM-DD") == moment(i).format("YYYY-MM-DD")).length > 0) {
            temp.push({
                date: moment(i).format("YYYY-MM-DD"),
                count: shops.filter(p => moment(p.createdAt).format("YYYY-MM-DD") == moment(i).format("YYYY-MM-DD")).length,
            });
            continue;
        }

        temp.push({
            date: moment(i).format("YYYY-MM-DD"),
            count: 0,
        });
    }

    return temp;
};

export default {
    getCountOfAppointedServices,
    getTotalAppointment,
    getTotalIncome,
    getPendingAppointments,
    getCanceledAppointments,
    getCompletedAppointments,
    getNumberOfServicesOffered,
    getNumberOfServicesByUser,
    getTotalCategories,
    getTotalShops,
    getTotalUsers,
    getNewlyRegisteredUsers,
    getNewlyRegisteredShops,
}