/*
 This is the server side code that will be processing the user data
 and can evaluate the the user risk.  
 
 One of the first things that will need to be done is setting the user data
 which can be done with the 'setDate(somedata)' function 

 next use the 'getRiskDate()' function 
*/

var userData = ''
/* the object will look 
{
    "height": "5'5",
    "weight":"150",
    "age":"30",
    "systolic":"120",
    "diastolic":"75",
    "diabetes":"no",
    "cancer":"no",
    "alzheimers":"no"
}
*/

//var that will be sent over 
var riskPoints = 0
var riskCat = "df"
var bp = "df"
var bmi = "df"

//this will return meters
function convertHeight(ht) {

    var arr = ht.split("'")
    let feet = parseInt(arr[0], 10)
    let inches = parseInt(arr[1], 10)
    //console.log(feet)
    //console.log(inches)

    //converting to meters
    var heightMeters = ((feet / 3.281)) + ((inches / 39.37))
    heightMeters = heightMeters.toFixed(2)

    //console.log(heightMeters)

    return heightMeters

}

function calBMI() {
    var weight = parseInt(userData.weight, 10)
    weight = (weight / 2.205).toFixed(2) //converting into KG and stops at 2nd decimal place
    var height = convertHeight(userData.height)

    let num = parseFloat((weight / (height * height)).toFixed(2))
    //console.log(num)

    if (num < 18.5) {
        bmi = "UnderWeight"

    } else if (num <= 24.9) {
        bmi = "Normal"

    } else if (num <= 29.9) {
        bmi = "Overweight"
        riskPoints = riskPoints + 30;

    } else if (34.4 <= num) {
        bmi = "Obesity"
        riskPoints = riskPoints + 75;

    }

    //console.log(bmi)

}

function calBlood() {
    /*
        Blood Pressure:
    normal		- 0 points
    elevated	- 15 points
    stage 1		- 30 points
    stage 2 	- 75 points
    crisis		- 100 points
    */

    var systolic = parseInt(userData.systolic, 10)
    var diastolic = parseInt(userData.diastolic, 10)
    //console.log(systolic)
    //console.log(diastolic)

    if(systolic < 120 && diastolic < 80){
        bp = "NORMAL";

    }
    else if(systolic <= 129 && diastolic < 80){
        bp = "ELEVATED";
        riskPoints = riskPoints + 15;

    }
    else if(systolic <= 139 || diastolic <= 89){
        bp = "HIGH BLOOD PRESSURE (HYPERTENSION) STAGE 1";
        riskPoints = riskPoints + 30;

    }
    else if(systolic <= 140 || diastolic <= 90){
        bp = "HIGH BLOOD PRESSURE (HYPERTENSION STAGE 2)";
        riskPoints = riskPoints + 75;

    }
    else if(180 <= systolic || 120 <= diastolic){
        bp = "HYPERTENSIVE CRISIS (consult your doctor immediately)";
        riskPoints = riskPoints + 100;

    }
}


function calAge() {
    var age = parseInt(userData.age, 10)

    switch (age) {
        case (age < 30):
            riskPoints = riskPoints + 0;
            break;
        case (age < 45):
            riskPoints = riskPoints + 10;
            break;
        case (age < 60):
            riskPoints = riskPoints + 20;
            break;
        case (60 <= age):
            riskPoints = riskPoints + 30;
            break;
    }

}

function calFamDisease() {
    //diabetes 10pts
    //cancer 10pts
    //alzheimer 10pts

    var diabetes = userData.diabetes
    var cancer = userData.cancer
    var alzheimer = userData.alzheimer

    if (diabetes == "yes") {
        riskPoints = riskPoints + 10;
    }
    if (cancer == "yes") {
        riskPoints = riskPoints + 10;
    }
    if (alzheimer == "yes") {
        riskPoints = riskPoints + 10;
    }

}

function calRiskCategory() {
    /*Total Score and Risk Category:
    <= 20		- low risk
    <= 50		- moderate risk
    <= 75		- high risk
    else		- uninsurable
    */


    if (riskPoints <= 20){
        riskCat = "low risk";
    }
    else if(riskPoints <= 50){
        riskCat = "moderate risk";

    }
    else if(riskPoints <= 75){
        riskCat = "moderate risk";

    }
    else if(riskPoints >= 76){
        riskCat = "uninsurable";


        
    if (riskPoints <= 20){
        riskCat = "low risk";
    } else if (riskPoints <= 50){
        riskCat = "moderate risk";
    } else if  (riskPoints <= 75){
        riskCat = "high risk";
    } else if  (76 <= riskPoints){
        riskCat = "uninsurable";

    }
    
}
}

function processData() {
    //console.log("i am in prcess data")
    calBMI()
    calBlood()
    calAge()
    calFamDisease()
    calRiskCategory()
}

/**
 * use this function to set userdate
 * it has to be json object
*/
exports.setData = (data) => {
    userData = data
}

/**
 * This function should get called in the 'index.js'
 * so it can pass the data into the handlebars 
 * 
 * @returns json onbject
 */
exports.getRiskData = () => {
    var jsonObj = {
        'riskCategory': 'NA',
        'points': '0',
        'blood': 'NA',
        'bmi': 'NA'
    }
    riskPoints = 0;

    processData()

    jsonObj.riskCategory = riskCat
    jsonObj.points = riskPoints
    jsonObj.blood = bp
    jsonObj.bmi = bmi

    return jsonObj
}

