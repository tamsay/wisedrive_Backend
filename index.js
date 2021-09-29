const moment = require('moment');
// const convertToJson = require ('./csvConverter')

// import matcher from './index';

// convertToJson('vehicles_bmw.csv', 'vehicles.json');
// convertToJson('vehicle_types.csv', 'vehicleTypes.json');



const vehicle = require('./vehicles.json');
const vehicleType = require('./vehicleTypes.json');

const getCategoryOneIds = (baseModel, year) => {
    let carIds = []
            
                let result = vehicleType.filter(element => {
                    const date = new Date();
                    const monthOfConstrFrom = element.monthOfConstrFrom;
                    const monthOfConstrTo = element.monthOfConstrTo || date;

                    if (element.typeName.toLowerCase() === baseModel.toLowerCase() && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                        return element;
                    }
                })
                carIds.length === 0 ? {
                    message: 'Match Not Found'
                } : {
                    message: 'Match Found',
                    carIds,
                    model
                };
}

const matchCar = () => {
let finalResult = []
    vehicle.map(car => {
        let model = car.model;
        let year = car.regDate
        let firstCharacter = model.substring(0, 1);
        let firstCharacterRegex = /\d/gi;
        let charTest = firstCharacterRegex.test(firstCharacter);
    
        if (charTest) {
            const strArray = model.trim().toLowerCase().split(' ');
        
            if (strArray.length === 1) {
                const baseModel = `${strArray[0].substring(0, 3)} ${strArray[0].substring(3)}`;

                let carIds = []
            
                let result = vehicleType.filter(element => {
                    const date = new Date();
                    const monthOfConstrFrom = element.monthOfConstrFrom;
                    const monthOfConstrTo = element.monthOfConstrTo || date;

                    if (element.typeName.toLowerCase() === baseModel.toLowerCase() && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                })
                finalResult.push({
                    model,
                    year: moment(year).format('YYYY'),
                    carIds,
                });
            }
            else {
                const baseModel = `${strArray[0].substring(0, 3)} ${strArray[0].substring(3)}`
                const subModelId = (`${strArray.splice(1).join(',').replace(/[\s,]/g, '')}`)
                const newModelId = (`${baseModel} ${subModelId}`);
                let carIds = [];

                let result = vehicleType.filter(element => {
                    const date = new Date();
                    const monthOfConstrFrom = element.monthOfConstrFrom;
                    const monthOfConstrTo = element.monthOfConstrTo || date;

                    if (element.typeName.toLowerCase() === newModelId.toLowerCase() && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                    else if (element.typeName.toLowerCase().includes(baseModel.toLowerCase()) && element.model.toLowerCase().replace(/[\s,]/g, '').includes(subModelId.toLowerCase()) && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                })
                finalResult.push({
                    model,
                    year: moment(year).format('YYYY'),
                    carIds,
                });
            }
        }
        else {
            const strArray = model.trim().toLowerCase().split(' ');
            if (strArray.length === 1) {
                const baseModel = strArray[0];
                let carIds = [];

                let result = vehicleType.filter(element => {
                    const date = new Date();
                    const monthOfConstrFrom = element.monthOfConstrFrom;
                    const monthOfConstrTo = element.monthOfConstrTo || date;

                    if (element.model.toLowerCase().includes(baseModel.toLowerCase()) && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                })
                finalResult.push({
                    model,
                    year: moment(year).format('YYYY'),
                    carIds,
                });
            }
            else {
                const baseModel = strArray[0];
                const subModelId = (`${strArray.splice(1).join(',').replace(/[\s,]/g, "")}`)
                const newModelId = (`${baseModel} ${subModelId}`);
                let carIds = [];

                let result = vehicleType.filter(element => {
                    const date = new Date();
                    const monthOfConstrFrom = element.monthOfConstrFrom;
                    const monthOfConstrTo = element.monthOfConstrTo || date;

                    if (element.typeName.toLowerCase() === newModelId.toLowerCase() && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                    else if (element.model.toLowerCase().includes(baseModel.toLowerCase()) && element.typeName.toLowerCase().replace(/[\s,]/g, '') === subModelId.toLowerCase() && moment(year).isBetween(monthOfConstrFrom, monthOfConstrTo)) {
                        carIds.push(element.carId)
                    }
                })
                finalResult.push({
                    model,
                    year: moment(year).format('YYYY'),
                    carIds,
                });
            }
        }
    })
    // console.log(finalResult)
    return finalResult
}
const matchedCars = matchCar();
console.log(matchedCars)