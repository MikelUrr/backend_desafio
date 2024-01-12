import timekeepingController from "./timekeepingController.js";
import userApiController from "../userController/userApiController.js";
import userController  from "../userController/userController.js";

const registerTimekeeping = async (req, res) => {
    try {

        const { registerType } = req.body;
        if (!registerType) {
            res.status(400).json("registerType is required");
            return;
        }
        const userId = await userApiController.getIdFromToken(req.headers.cookie);
        if (!userId) {
            res.status(400).json("You need to login");
            return;
        }
        const userIdRegister = await timekeepingController.getallTimekeepingByUserId(userId);
        const dateNow = new Date().getDay();
        let duplicateRegistration = false;
        userIdRegister.forEach(element => {

            const dateRegister = new Date(element.date).getDay();
            if (dateNow === dateRegister && element.registerType === registerType) {
                duplicateRegistration = true;
            }
        });
        if (duplicateRegistration) {
            res.status(400).json("You have already registered today");
            return;
        }
        const registerTime = getHour();
        const timekeeping = await timekeepingController.registerTimekeeping(userId, registerTime, registerType);
        if (!timekeeping) {
            res.status(400).json("Error registering timekeeping");
            return;
        }
        res.status(201).json(timekeeping);
    } catch (e) {
        console.error(e);
        res.status(500).json("Error registering timekeeping");
    }
}

const getHour = () => {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    if (minutes < 10) {
        return `${hour}:0${minutes}`;
    }
    return `${hour}:${minutes}`;
}
// get all timekeeping for today 



const getTodayTimeKeepingSummary = async () => {
    try {
        const allTimeKeeping = await timekeepingController.getallTimekeeping();
        
        const dateNow = new Date().getDay();

        // Crear un mapa para almacenar las horas de entrada y salida por cada usuario
        const userSummaryMap = new Map();

        allTimeKeeping.forEach(element => {
            const dateRegister = new Date(element.date).getDay();
            
            if (dateNow === dateRegister) {
                
                const userId = element.userId;
                const registerType = element.registerType;
                const registerTime = element.registerTime;

                if (!userSummaryMap.has(userId)) {
                    userSummaryMap.set(userId, {
                        userId: userId,
                        horaEntrada: '--:--',
                        horaSalida: '--:--',
                    });
                }

                const userSummary = userSummaryMap.get(userId);

                if (registerType === 'Entrada') {
                    userSummary.horaEntrada = registerTime;
                } else if (registerType === 'Salida') {
                    userSummary.horaSalida = registerTime;
                }

                userSummaryMap.set(userId, userSummary);
            }
        });

        // Convertir el mapa a un array para obtener el resultado final
        const userSummaryArray = Array.from(userSummaryMap.values());

        return userSummaryArray;
    } catch (e) {
        console.error(e);
        return false;
    }
};



// get all user and timekeeping for today   

const getUserByTimeKeeping = async (req, res) => {
    try {
        const alluser = await userController.getallUsersActive();
        const allTimeKeeping = await getTodayTimeKeepingSummary();

        // Crear un mapa para almacenar la información del usuario y su timekeeping para hoy
        const userSummaryMap = new Map();
        
        alluser.forEach(element => {
            const userId = element._id;
            const userName = element.name;
            const userLastName = element.surname;
            const userPosition = element.rol;

            const userTimekeeping = allTimeKeeping.find(timekeeping => timekeeping.userId === userId.toString());

            if (userTimekeeping) {
                // Crear el objeto del usuario con información de timekeeping
                const userSummary = {
                    userId: userId,
                    name: userName,
                    surname: userLastName,
                    rol: userPosition,
                    horaEntrada: userTimekeeping.horaEntrada,
                    horaSalida: userTimekeeping.horaSalida,
                    status: userTimekeeping.horaSalida === '--:--' ? 'On' : 'Off',
                };

                userSummaryMap.set(userId, userSummary);
            } else {
                // Crear el objeto del usuario sin información de timekeeping
                userSummaryMap.set(userId, {
                    userId: userId,
                    name: userName,
                    surname: userLastName,
                    rol: userPosition,
                    horaEntrada: '--:--',
                    horaSalida: '--:--',
                    status: 'Off',
                });
            }
        });

        // Enviar la respuesta con el array de objetos de usuarios con status
        res.status(200).json(Array.from(userSummaryMap.values()));
    } catch (e) {
        console.error(e);
        res.status(500).json("Error getting user");
    }
};



export default { registerTimekeeping, getHour, getUserByTimeKeeping, getTodayTimeKeepingSummary };

