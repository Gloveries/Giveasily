const basic_plan_percentage =  98.5;
const premium_plan_percentage = 97.2;
module.exports = function(plan){
    switch(plan) {
        case 'basic':
            return basic_plan_percentage;
            
        case 'premium':
            return premium_plan_percentage;
            
    }
}