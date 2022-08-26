import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './css/Customer-card.css';
import Accountlist from './Accountlist'
import { ToastContainer } from 'react-toastify';
import Api from '../utils/Api';
import Notification from '../utils/Notification';
import { AutoSuggest } from 'react-autosuggestions';
import _ from 'lodash';
import AccountDetailes from './AccountDetailes';
import { MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import LoadingSpinner from '../utils/LoadingSpinner';


export default function AccountOpening() {

    const [accountId, setaccountId] = useState();
    const [accNo, setaccNo] = useState();
    const [name, setname] = useState();
    const [ifscCode, setifscCode] = useState();
    const [accountType, setaccountType] = useState();
    const [amount, setamount] = useState();
    const [bankName, setbankName] = useState([]);
    const [bankId, setbankId] = useState('');
    const [customerId, setcustomerId] = useState();
    const [accountArray, setaccountArray] = useState([]);
    const [isEditClick, setIsEditClick] = useState(false);
    const [accountTypeData, setaccountTypeData] = useState([]);
    // const [singleAccount, setsingleAccount] = useState([]);
    const [customerName, setcustomerName] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

// get allCustomer those don't have account
    const getCustomer = (bankId) => {
        setIsLoading(true);
        Api.getCustomer(bankId).then(response => {
            if(response.status===200){
                setIsLoading(false)
                Notification.notifySuccess(response.data)
                return setcustomerName(response.data)
            }
        })
    }
    const getAllBank = () => {
        setIsLoading(true);
        Api.getAllBank().then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                Notification.notifySuccess(response.data)
                return setbankName(response.data)
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
                return;
            }
            Notification.notifyError("Some error occure !!");
        })
    }

    const getAccount = (accNo) => {
        setIsLoading(true);
        Api.getAccount(accNo).then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                Notification.notifySuccess(response.data)
                return setaccountArray(response.data)
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
                return;
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    const getAllAccount = () => {
        setIsLoading(true);
        Api.getAllAccount().then(response => {
            if (response.status === 200) {
                const accountTypeData = response.data.map(ele =>
                    ele.accountType);
                setaccountTypeData(accountTypeData)
                setIsLoading(false);
                return setaccountArray(response.data)
            }
            else {

            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
                return;
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    const onAccountChange = (e) => {
        const tragetValue = e.target.value
        if (_.isEmpty(tragetValue)) {
            setaccountArray([]);
            return;
        }
        getAccount(parseInt(tragetValue));
    }
    const onBankNameChange = (e) => {
        const tragetValue = e.target.value
        setbankId(tragetValue);
        getCustomer(tragetValue);
    }
    const onCustomerChange = (e) => {
        const tragetValue = e.target.value
        setcustomerId(tragetValue);
    }
    useEffect(() => {
        getAllAccount();
        getAllBank();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let accountdata = {
            "name": " ",
            "ifscCode": " ",
            "accountType": " ",
            "amount": " ",
            "customerId": " ",
            "bankId": " "
        }
        const accountFormdata = { name, ifscCode, accountType, amount, customerId, bankId };
        if (!_.isEmpty(accountFormdata.accountType)) {
            if (isEditClick) {
                accountdata.name = accountFormdata.name
                accountdata.ifscCode = accountFormdata.ifscCode
                accountdata.accountType = accountFormdata.accountType
                accountdata.amount = accountFormdata.amount
                accountdata.customerId = accountFormdata.customerId
                accountdata.bankId = accountFormdata.bankId
                setIsLoading(true);
                Api.updateaccount(accountId, accountdata).then(response => {
                    if (response.status === 200) {
                        getAllAccount();
                        onreset();
                        setIsLoading(false);
                        Notification.notifySuccess(response.data)
                    }
                }).catch(reson => {
                    if (reson.response.status === 400) {
                        setIsLoading(false);
                        Notification.notifyError(reson.response.data.message);
                        return;
                    }
                    Notification.notifyError("Some error occure !!")
                })
                setIsEditClick(false);
            }
            else {
                accountdata.name = accountFormdata.name
                accountdata.ifscCode = accountFormdata.ifscCode
                accountdata.accountType = accountFormdata.accountType
                accountdata.amount = accountFormdata.amount
                accountdata.customerId = accountFormdata.customerId
                accountdata.bankId = accountFormdata.bankId
                setIsLoading(true);
                Api.postAccount(accountdata).then(response => {
                    if (response.status === 201) {
                        getAllAccount();
                        getAllBank();
                        onreset();
                        setIsLoading(false);
                        Notification.notifySuccess(response.data)
                    }
                }).catch(reson => {
                    if (reson.response.status === 400) {
                        setIsLoading(false);
                        Notification.notifyError(reson.response.data.message);
                        return;
                    }
                    Notification.notifyError("Some error occure !!")
                })
            }
        }
        else {
            Notification.notifyError("please fill all required fields")
        }
        return;
    }
    const onDataEdit = (index) => {
        const data = accountArray[index]
        setIsEditClick(true);
        setaccountId(data.accountId);
        setaccNo(data.accNo);
        setname(data.name);
        setifscCode(data.ifscCode);
        setaccountType(data.accountType);
        setamount(data.amount);
        setbankId(data.bankId);
        setcustomerId(data.customerId);
    }
    const onDataDelete = (data) => {
        setIsLoading(true);
        Api.deleteaccount(data.accountId).then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                Notification.notifySuccess(response.data)
                getAllAccount();
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
                return;
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    onreset = (e) => {
        setaccNo("");
        setname("");
        setifscCode("");
        setaccountType("");
        setamount("");
        setbankId("");
        setcustomerId("");
    }
    return (
        <div>
            <div className='row'>
                <div className="card col-6 customerCard">
                    <div className="card-header">
                        <h1><MdOutlineAccountCircle /> Account Opening</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="row">
                                <div className="col">
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <select className='form-conrol' onChange={onBankNameChange}>
                                        <option value={''} selected >--select Bank--</option>
                                        {bankName.map(ele => {
                                            return <option value={ele.bankId}>{ele.bankName}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <select className='form-conrol' onChange={onCustomerChange}>
                                        <option value={''} selected >--select Customer--</option>
                                        {customerName.map(ele => {
                                            return <option value={ele.customerId}>{ele.customerName}</option>
                                        })}
                                    </select>
                                    {/* <label>customerId</label>
                                    <input type="text" value={customerId} onChange={(e) => setcustomerId(e.target.value)} className="form-control" required /> */}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label>ifscCode</label>
                                    <input type="text" value={ifscCode} onChange={(e) => setifscCode(e.target.value.toUpperCase())} className="form-control" maxLength="11" minlength="11" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <AutoSuggest
                                        options={accountTypeData}
                                        handleChange={setaccountType}
                                        value={accountType}
                                        name="AccountType"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Amount</label>
                                    <input type="text" value={amount} onChange={(e) => setamount(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="submit" onClick={() => { }}>Submit form</button>
                                </div>
                            </div>
                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="reset" onClick={() => onreset()}>Reset form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-6 cardCustomer-table'>
                    <h1> <MdAccountCircle /> Get Your Account Details</h1>
                    <div className="row">
                        <div className="col">
                            <label>Enter Your Account No.</label>
                            <input type="text" value={accNo} onChange={onAccountChange} className="form-control" required />
                        </div>
                    </div>
                    {/* <AccountDetailes singleAccount={singleAccount} /> */}
                    <Accountlist  accountArray={accountArray} onDataEdit={onDataEdit} onDataDelete={onDataDelete} />
                </div>
            </div>
            {isLoading && <LoadingSpinner />}
            <ToastContainer />
        </div>
    )
}
