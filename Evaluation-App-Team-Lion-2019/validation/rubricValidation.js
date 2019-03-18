const isEmpty = require("is-empty");

module.exports = function validateRubric(data){
let errors ={};

data.columns = !isEmpty(data.columns) ? data.columns : "";
data.rows = !isEmpty(data.rows) ? data.rows : "";


if(isEmpty(data.columns)){
    errors.columns = "Number of columns is required";
}
if(!typeof(data.columns=="number"))
{
    errors.columns = "Please enter a valid number";
}
else{
    if(Number(data.columns)<=0){
        errors.columns = "It is not a valid number of columns"
    }
}


if(isEmpty(data.rows)){
    errors.rows= "Number of rows is required";
}
if(!typeof(data.rows=="number"))
{
    errors.rows= "Please enter a valid number";
}
else{
    if(Number(data.rows)<=0){
        errors.rows = "It is not a valid number of rows"
    }
}

return{
    errors,
    isValid: isEmpty(errors)
};
};