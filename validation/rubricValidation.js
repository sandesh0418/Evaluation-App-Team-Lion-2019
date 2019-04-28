const isEmpty = require("is-empty");




module.exports = function validateRubric(data){
    let errors ={};








if(!typeof(data.rows=="number"))
{
    errors.rows = "Please enter a valid number";
}
else{
    if(Number(data.rows)<=0){
        errors.rows = "It is not a valid number of rows"
    }
}




if(!typeof(data.scores=="number"))
{
    errors.scores= "Please enter a valid number";
}
else{
    if(Number(data.scores)<=0){
        errors.scores = "It is not a valid number of scores"
    }
}






return{
    errors,
    isValid: isEmpty(errors)
};
};