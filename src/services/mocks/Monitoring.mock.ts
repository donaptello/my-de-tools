import { MonitoringTotalDataRes } from "../types/Monitoring.types";


export const monitoringTotalDataMock: MonitoringTotalDataRes = {
    statusCode: 200,
    data: {
        totalTable: 175,
        inCompleted: 59,
        completed: 45,
        toBeChecked: 73,
    }
}