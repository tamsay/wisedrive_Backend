const moment = require('moment');
// const convertToJson = require ('./csvConverter')

// import matcher from './index';

// convertToJson('vehicles_bmw.csv', 'vehicles.json');
// convertToJson('vehicle_types.csv', 'vehicleTypes.json');


const vehicle = require('./vehicles.json');
const vehicleType = require('./vehicleTypes.json');
const date = new Date();


const getNumberSeriesGroup1 = (model, baseModel, year) => {
    let carIds = []
    vehicleType.map(element => {
        if (element.typeName.toLowerCase() === baseModel.toLowerCase() && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
    })
    return ({
        model,
        year: moment(year).format('YYYY'),
        carIds
    });
}

const getNumberSeriesGroup2 = (model, baseModel, subModelId, newModelId, year) => {
    let carIds = []
    vehicleType.map(element => {
        if (element.typeName.toLowerCase() === newModelId.toLowerCase() && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
        else if (element.typeName.toLowerCase().includes(baseModel.toLowerCase()) && element.model.toLowerCase().replace(/[\s,]/g, '').includes(subModelId.toLowerCase()) && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
    })
    return ({
        model,
        year: moment(year).format('YYYY'),
        carIds
    });
}

const getLetterSeriesGroup1 = (model, baseModel, year) => {
    let carIds = []
    vehicleType.map(element => {
        if (element.model.toLowerCase().includes(baseModel.toLowerCase()) && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
    })
    return ({
        model,
        year: moment(year).format('YYYY'),
        carIds
    });
}

const getLetterSeriesGroup2 = (model, baseModel, subModelId, newModelId, year) => {
    let carIds = []
    vehicleType.map(element => {
        if (element.typeName.toLowerCase() === newModelId.toLowerCase() && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
        else if (element.model.toLowerCase().includes(baseModel.toLowerCase()) && element.typeName.toLowerCase().replace(/[\s,]/g, '') === subModelId.toLowerCase() && moment(year).isBetween(element.monthOfConstrFrom, element.monthOfConstrTo || date)) {
            carIds.push(element.carId)
        }
    })
    return ({
        model,
        year: moment(year).format('YYYY'),
        carIds
    });
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
                let match = getNumberSeriesGroup1(model, baseModel, year);
                finalResult.push(match);
            }
            else {
                const baseModel = `${strArray[0].substring(0, 3)} ${strArray[0].substring(3)}`
                const subModelId = `${strArray.splice(1).join(',').replace(/[\s,]/g, '')}`;
                const newModelId = `${baseModel} ${subModelId}`;

                let match= getNumberSeriesGroup2(model, baseModel, subModelId, newModelId, year)
                finalResult.push(match);
            }
        }
        else {
            const strArray = model.trim().toLowerCase().split(' ');
            if (strArray.length === 1) {
                const baseModel = strArray[0];
                let match= getLetterSeriesGroup1(model, baseModel, year)
                finalResult.push(match);
            }
            else {
                const baseModel = strArray[0];
                const subModelId = (`${strArray.splice(1).join(',').replace(/[\s,]/g, "")}`)
                const newModelId = (`${baseModel} ${subModelId}`);
                let match= getLetterSeriesGroup2(model, baseModel, subModelId, newModelId, year)
                finalResult.push(match);
            }
        }
    })
    return finalResult
}
const matchedCars = matchCar();
console.log(matchedCars)