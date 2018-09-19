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
CREATING A SUB ACCOUNT
METHOD:POST
REQUEST BODY
{
business_name
"account_number,
percentage_charge
primary_contact_email
settlement_schedule
}
SAMPLE RESPONSE
RESPONSE BODY
{
    "status": true,
    "message": "Subaccount created",
    "data": {
        "business_name": "Temilola Kutelu",
        "primary_contact_email": "osamaimafidon@gmail.com",
        "settlement_bank": "Access Bank",
        "percentage_charge": 98.5,
        "integration": 108704,
        "domain": "test",
        "subaccount_code": "ACCT_o6nwl4c2i6v0cpb",
        "is_verified": false,
        "settlement_schedule": "AUTO",
        "active": true,
        "migrate": false,
        "id": 11646,
        "createdAt": "2018-08-24T19:58:16.241Z",
        "updatedAt": "2018-08-24T19:58:16.241Z"
    }
}
--------------------------------------------------------------------------------------
UPDATING A SUBACCOUNT
METHOD:PUT
REQUEST BODY- Any one of the fields listed above

SAMPLE RESPONSE
{
    "status": true,
    "message": "Subaccount updated",
    "data": {
        "domain": "test",
        "subaccount_code": "ACCT_10gicgtl2duxcuq",
        "business_name": "Arewa Youth Forum",
        "description": null,
        "primary_contact_name": null,
        "primary_contact_email": null,
        "primary_contact_phone": null,
        "metadata": null,
        "percentage_charge": 15.6,
        "is_verified": false,
        "settlement_bank": "Acccess Bank",
        "account_number": "0000000",
        "settlement_schedule": "AUTO",
        "active": true,
        "migrate": false,
        "id": 11672,
        "integration": 108704,
        "createdAt": "2018-08-25T03:40:00.000Z",
        "updatedAt": "2018-08-25T18:18:04.000Z"
    }
}
----------------------------------------------------------------------------------------
SAMPLE RESPONSE BODY FROM PAYSTACK CALLING MY WEBHOOK

{ event: 'charge.success',
  data:
   { id: 46353758,
     domain: 'test',
     status: 'success',
     reference: 'T404901331607124',
     amount: 7800000,
     message: null,
     gateway_response: 'Successful',
     paid_at: '2018-08-25T23:45:20.000Z',
     created_at: '2018-08-25T23:45:08.000Z',
     channel: 'card',
     currency: 'NGN',
     ip_address: '197.210.55.109',
     metadata:
      { custom_fields: [Array],
        referrer: 'http://localhost:3001/dashboard' },
     log:
      { time_spent: 11,
        attempts: 1,
        authentication: null,
        errors: 0,
        success: false,
        mobile: false,
        input: [],
        channel: null,
        history: [Array] },
     fees: 127000,
     fees_split: null,
     authorization:
      { authorization_code: 'AUTH_cpfc7d0ezg',
        bin: '408408',
        last4: '4081',
        exp_month: '01',
        exp_year: '2020',
        channel: 'card',
        card_type: 'visa DEBIT',
        bank: 'Test Bank',
        country_code: 'NG',
        brand: 'visa',
        reusable: true,
        signature: 'SIG_TjtWkSTY4U7RfSgnvJtv' },
     customer:
      { id: 2721268,
        first_name: '',
        last_name: '',
        email: 'f@g.com',
        customer_code: 'CUS_kuv9o21jrdxube8',
        phone: '',
        metadata: null,
        risk_action: 'default' },
     plan: {},
     subaccount: {},
     paidAt: '2018-08-25T23:45:20.000Z' } }
----------------------------------------------------------------------------------------
CREATING A PAYMENT PAGE
METHOD:'POST'
url:

sample body 
{
    name:"donations" // this is compulsory
    description:"Give to the lord"      //This is not compulsory
}

SAMPLE RESPONSE FROM THE ABOVE SAMPLE REQUEST

{
    "status": true,
    "message": "Page created",
    "data": {
        "name": "donation",
        "description": "give to the lord",
        "integration": 108704,
        "domain": "test",
        "slug": "tf4o1flxzi",
        "currency": "NGN",
        "type": "payment",
        "collect_phone": false,
        "active": true,
        "published": true,
        "migrate": false,
        "id": 47618,
        "createdAt": "2018-09-10T16:20:58.939Z",
        "updatedAt": "2018-09-10T16:20:58.939Z"
    }
}
-----------------------------------------------------------------------------------------------------------
UPDATING A PAGE
METHOD: 'PUT'
url: https://api.paystack.co/page/[slug]
SAMPLE REQUEST
{
    description:"just wanted to change the description a bit
    active:false
}
SAMPLE RESPONSE
{
    "status": true,
    "message": "Page updated",
    "data": {
        "domain": "test",
        "name": "der",
        "description": "give your heart",
        "amount": null,
        "currency": "NGN",
        "slug": "dbx2inae-0",
        "custom_fields": null,
        "type": "payment",
        "redirect_url": null,
        "success_message": null,
        "collect_phone": false,
        "active": false,
        "published": true,
        "migrate": false,
        "notification_email": null,
        "metadata": null,
        "id": 48103,
        "integration": 108704,
        "plan": null,
        "createdAt": "2018-09-13T09:41:02.000Z",
        "updatedAt": "2018-09-13T18:17:41.000Z"
    }
}