const loginUrl = "http://localhost:3000/api/v1/users/login";
const registerUrl = "http://localhost:3000/api/v1/users/register"
const verifyBvn = "http://localhost:3000/api/v1/verify_bvn"
export const getUrl = function(purpose){
    switch(purpose) {
        case 'registeration':
        
        return registerUrl;

        case 'login':
        return loginUrl;

        case 'verifybvn':
        return verifyBvn;
    }
}