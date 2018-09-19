const paystack_subaccount = 'https://api.paystack.co/subaccount';
const verify_transaction = 'https://api.paystack.co/transaction/verify';
const pages = 'https://api.paystack.co/page';
const base_payment_page = 'https://paystack.com/pay'
module.exports = function(urlFor) {
    switch(urlFor) {
        case 'paystack_subaccount':
            return paystack_subaccount;
        case 'verify_transaction':
            return verify_transaction;
        case 'pages':
            return pages;
        case 'base_payment_page':
            return base_payment_page;
    }
}