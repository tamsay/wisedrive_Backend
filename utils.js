const date = new Date();
const vehicleType = require('./vehicleTypes.json');
const moment = require('moment');

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

module.exports = {
    getNumberSeriesGroup1, getNumberSeriesGroup2, getLetterSeriesGroup1, getLetterSeriesGroup2
}