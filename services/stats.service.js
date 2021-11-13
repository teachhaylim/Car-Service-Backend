import { mongo } from "mongoose";
import { Appointment } from "../models";

const GetTotalIncomeByPeriod = async (period) => {
    const filter = {
        isActive: true,
        sellCompany: "617222fe0065218fc409ccdc",
        createdAt: { $gte: new Date("2021-11-01"), $lt: new Date("2021-11-10") },
        // "status.type": 2,
    };
    const appointments = await Appointment.find(filter);
    const total = appointments.reduce((acc, appointment) => {
        return acc + appointment.services.reduce((acc, service) => {
            return acc + service.service.price;
        }, 0);
    }, 0);

    const temp = {
        total: total,
        numberOfAppointments: appointments.length,
        bd: "2021-11-01",
        ed: "2021-11-10",
        sellCompany: "617222fe0065218fc409ccdc",
        status: "Paid",
        numberOfUser: appointments.length,
    }

    return temp;
};

export default {
    GetTotalIncomeByPeriod,
}