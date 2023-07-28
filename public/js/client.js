// this code should check the input 

//console.log("testing this javascript"); //it works

// a empty string mean no errors // all good
var errors = {
    "height": "",
    "weight": "",
    "age": "",
    "systolic": "",
    "diastolic": "",
    "diabetes": "",
    "cancer": "",
    "alzheimers": ""
}

//same formate as in server.js
var userData


exports.setData  = (data) =>{
    userData = data
} 

function checkHeight() {
    var height = userData.height

    try{
        let arr = height.split("'")
        feet = parseInt(arr[0], 10)
        inches = parseInt(arr[1], 10)
        //console.log(arr[0])
        //console.log(arr[1])        

        if (3 <= feet) {//checks feet
            
            if(feet < 9){
                //all good
            }else{
                errors.height = "Error in height in feet is high" 
            }
        
        }else{
            errors.height = "Error in height in feet is low"          
    
        } 

        if (0 <= inches){
            if(inches <= 11) {
                //all good
            }else{
                errors.height = "height in inches is to high"
            }           
        }
        else{
           errors.height = "height in inches is low"
        }


    }catch(err){
        errors.height = "enter somthing"
        

    }     

}

function checkWeight() {
    var weight = userData.weight

    if(0 <= weight ) {

        if (weight <= 500){
            //all good
        }else{ errors.weight = "weight to high"}

    }else{
        errors.weight = "weight can not be negtive"
        
    }  

}

function checkAge() {
    var age = userData.age

    if(0 <= age ) {

        if (age <= 120){
            //all good
        }else{ errors.age = "age to high"}


    }else{
        errors.age = "age can not be negtive"        
    }    

}

function checkSysolic() {
    var systolic = userData.systolic
        
    if(0 <= systolic ) {
        
        if(systolic <=300){
        //good
        } else { errors.systolic = "systolic to high"}

    }else { errors.systolic ="systolic cannot be negative"}


}      
        

function checkDiastolic() {
    var diastolic = userData.diastolic
    if(0 <= diastolic ) {
        
        if(diastolic <=300){
            //good
        }else {errors.diastolic ="diastolic too high"}

    }else{
        errors.diastolic="diastolic can not be negative"
    }
}


function checkYN() {
    var diabetes = userData.diabetes.toLowerCase()
    var cancer = userData.cancer.toLowerCase()
    var alzheimers = userData.alzheimers.toLowerCase()

    if (diabetes == "yes" || diabetes == 'no'){
        //all good
    } else{
        errors.diabetes ="Must enter yes or no for diabetes"
    } 
    
    if (cancer  == "yes" || cancer == 'no'){
        //all good
    } else {
        errors.cancer ="Must enter yes or no for cancer"
    } 
    
    if (alzheimers  == "yes" || alzheimers == 'no'){
        //all good
    } else {
        errors.alzheimers ="Must enter yes or no for alzheimers"
    }
}


/*function will check the errors json object, if there are any errors*/
function checkUserInput (){
    checkHeight()
    checkWeight()
    checkAge()
    checkSysolic()
    checkDiastolic()
    checkYN()

}


exports.checkError = () => {
    
    checkUserInput()
    
    for( let key in errors){
        let value = errors[key]
        console.log(value)

        if(value != ""){
            //if there is just once error it returns the json object
            return errors
        }
    }

    return "good"

}

