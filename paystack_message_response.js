/*creating a sub account*/
/*compulsory parameters
METHOD:POST
URL:https://api.paystack.co/subaccount
-business name 
-settlement_bank e.g Access bank
-account_number e.g 0108901585 NUBAN
-percentage_charge -> MUST BE LESS THAN 100(Number)
OPTIONAL
primary_contact_email
primary_contact_NAME
settlement_schedule: auto, weekly,monthly or yearly-> this represents the frrequency of settlement
 of sub account
 others...

 SAMPLE REQUEST
 {
    "business_name": "giveasily",
    "settlement_bank": "Access Bank",
    "account_number":"0108901585",
    "primary_contact_email":"osamaimafidon@gmail.com",
    "settlement_schedule":"auto",
    "percentage_charge": 2.5
}
SAMPLE RESPONSE
{
    "status": true,
    "message": "Subaccount created",
    "data": {
        "business_name": "giveasily",
        "primary_contact_email": "osamaimafidon@gmail.com",
        "settlement_bank": "Access Bank",
        "account_number": "0108901585",
        "percentage_charge": 2.5,
        "settlement_schedule": "AUTO",
        "integration": 108704,
        "domain": "test",
        "subaccount_code": "ACCT_92i5xyzir0859lm",
        "is_verified": false,
        "active": true,
        "migrate": false,
        "id": 11055,
        "createdAt": "2018-08-09T15:52:31.310Z",
        "updatedAt": "2018-08-09T15:52:31.310Z"
    }
}
*/
//-----------------------------------------------------------------------------------//
/* Resolving(Verifying a bvn)
METHOD:GET
URL:https://api.paystack.co/bank/resolve_bvn/[BVN]
-Required-
-bvn passed as param
SAMPLE RESPONSE
{
    "status": true,
    "message": "BVN resolved",
    "data": {
        "first_name": "OSAMA",
        "last_name": "IMAFIDON",
        "dob": "06-Oct-90",
        "formatted_dob": "1990-10-06",
        "mobile": "2348164695529",
        "bvn": "3413456545"
    },
    "meta": {
        "calls_this_month": 1,
        "free_calls_left": 9
    }
}

----------------------------------------------------------------------------------

Resolve account Number
METHOD:GET
-Query params-
account_number
bank_code

-----------------------------------------------------------------------------------
LIST BANKS
METHOD:GET
HEADER: AUTHORIZATION Bearer SECRET_KEY
URL:https://api.paystack.co/bank
-YOU CAN GET A LIST OF ALL THE BANKS BY MAKGINA GET REQUEST TO-
https://api.paystack.co/bank?gateway=emandate&pay_with_bank=true
-----------------------------------------------------------------------------------

