# wisedrive_Backend
- This nodejs application matches car ID(s) to a given modelType. Initial data is gotten from two csv files which is converted to json.  

## Setup

- Simply clone this repo on your pc, by typing out this command on your terminal.

- - git clone https://github.com/tamsay/wisedrive_Backend.git

- Then navigate to the newly created folder by typing in this command in your terminal 
- - cd wisedrive_Backend

- First convert the csv files into JSON Format by running the following commands in your terminal:
- - npx csvtojson ./vehicles_bmw.csv > vehicles.json
- - npx csvtojson ./vehicle_types.csv > vehicleTypes.json

- To install all the requisite dependencies run:
- - npm install

- To start the application by run the following command:
- - npm run start

A log showing the result of the matched car IDs will be displayed on the console. 

- To run the test, execute the following command:

- - npm run test

Thank you.