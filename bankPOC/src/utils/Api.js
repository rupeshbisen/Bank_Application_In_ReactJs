import axios from "axios";

const getHeader = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const postHedaer = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}
const configGet = {
    headers: getHeader
}
const configPost = {
    headers: postHedaer
}
const authToken = localStorage.getItem("authToken");
if (authToken) {
    getHeader.Authorization = 'Bearer '.concat(authToken); 
    postHedaer.Authorization = 'Bearer '.concat(authToken)
    configGet.headers = getHeader
    configPost.headers = postHedaer
}

const baseUrl = `http://192.168.0.111:8181/api/`;


const instanceGet = axios.create({
    baseURL: baseUrl,
    headers: getHeader
});
const instancePost = axios.create({
    baseURL: baseUrl,
    headers: postHedaer
});

export default class Api {
    
    static handdleResponse(res) {
        if (res.status === 401) {
            localStorage.removeItem("authToken");
            //TODO redirect to login 
        }
    }
    // Login-controller
    static login(loginData) {
        return axios.post(baseUrl + `login`, loginData).then(res => {
            if (res.status === 200) {
                const authToken = res.data.token;
                getHeader.Authorization = 'Bearer '.concat(authToken); 
                postHedaer.Authorization = 'Bearer '.concat(authToken)
                configGet.headers = getHeader
                configPost.headers = postHedaer
                localStorage.setItem("authToken", authToken);
                return res;
            }
            else {
                throw "please check username or passsword"
            }
        });
    }
    // bank-controller
    static getAllBank() {
        return instanceGet.get(`bank/getAllBank`);
    }
    static getBankById(bankId, bankName) {
        if (bankId) {
            return instanceGet.get(`/bank/getBy/` + bankId)
        }
        if (bankName) {
            return instanceGet.get(`/bank/getBy/` + bankName)
        }
    }
    static postBank(bankData) {
        return instancePost.post(`/bank/creat`, bankData)
    }
    static updateBankId(bankId, bankData) {
       
        return instancePost.put(`/bank/update/` + bankId,bankData)
        
    }
    static deleteBank(bankId) {
        return instanceGet.delete(`/bank/delete/` + bankId)
    }
    //customer-controller 
    static getAllCustomer() {
        return instanceGet.get(`customer/getAll`);
    }
    static getAllCustomerById(customerId, mobileNumber,) {
        if (customerId) {
            return instanceGet.get(`/customer/getBy/`, +customerId);
        }
        if (mobileNumber) {
            return instanceGet.get(`/customer/getBy/`, +mobileNumber);
        }
    }
    static getCustomer(bankId) {
        return instanceGet.get(`/customer/getAllCustomersWithoutAccount/`+bankId)
    }
     static postcustomer(customerdata) {
        return instancePost.post(`/customer/create/`, customerdata, configPost)
    }    
    static deletecustomer(customerId) {
        return instanceGet.delete(`/customer/delete/` + customerId)
    }
    static updatecustomer(customerId, customerdata) {
        return instancePost.put(`/customer/update/` + customerId, customerdata)
    }
    static transferMoney(dataTransaction) {
        return instancePost.put(`/customer/transfer`, dataTransaction)
    }
    // account-controller
    static getAllAccount() {
        return instanceGet.get(`account/getAll`);
    }
    static getAllByBankId(bankId) {
        return instanceGet.get(`/account/getAllByBankId/` + bankId);
    }
    static getAccount(accNo) {
        return instanceGet.get(`/account/getBy/` + accNo);
    }
    static postAccount(accountdata) {
        return instancePost.post(`/account/create`, accountdata)
    }
    static deleteaccount(accountId) {
        return instanceGet.delete(`/account/delete/` + accountId)
    }
    static updateaccount(accountId, accountdata) {
        return instancePost.put(`/account/update/` + accountId, accountdata)
    }
    // transaction-controller
    static accountTransaction(accNo) {
        return instanceGet.get(`accountTransaction/` + accNo);
    }
    static sevenDaysTransaction() {
        return instanceGet.get(`/sevenDaysTransaction/`)
    }

}