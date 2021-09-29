// const convertToJson = require ('./csvConverter')

// convertToJson('vehicles_bmw.csv', 'vehicles.json');
// convertToJson('vehicle_types.csv', 'vehicleTypes.json');

const vehicle = require('./vehicles.json');
const getMatch = require('./utils');

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
                let match = getMatch.getNumberSeriesGroup1(model, baseModel, year);
                finalResult.push(match);
            }
            else {
                const baseModel = `${strArray[0].substring(0, 3)} ${strArray[0].substring(3)}`
                const subModelId = `${strArray.splice(1).join(',').replace(/[\s,]/g, '')}`;
                const newModelId = `${baseModel} ${subModelId}`;

                let match= getMatch.getNumberSeriesGroup2(model, baseModel, subModelId, newModelId, year)
                finalResult.push(match);
            }
        }
        else {
            const strArray = model.trim().toLowerCase().split(' ');
            if (strArray.length === 1) {
                const baseModel = strArray[0];
                let match= getMatch.getLetterSeriesGroup1(model, baseModel, year)
                finalResult.push(match);
            }
            else {
                const baseModel = strArray[0];
                const subModelId = (`${strArray.splice(1).join(',').replace(/[\s,]/g, "")}`)
                const newModelId = (`${baseModel} ${subModelId}`);
                let match= getMatch.getLetterSeriesGroup2(model, baseModel, subModelId, newModelId, year)
                finalResult.push(match);
            }
        }
    })
    return finalResult
}
const matchedCars = matchCar();
console.log(matchedCars)