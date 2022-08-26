import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './css/Customer-card.css';
import { ToastContainer } from 'react-toastify';
import MoneyTransList from './MoneyTransList';
import Api from '../utils/Api';
import Notification from '../utils/Notification';
import _ from 'lodash';
import { GiPayMoney,GiMoneyStack ,GiTakeMyMoney,GiReceiveMoney} from "react-icons/gi";
import LoadingSpinner from '../utils/LoadingSpinner';
// import { AutoSuggest } from 'react-autosuggestions';



export default function MoneyTrans() {
    const [accountNumberFrom, setaccountNumberFrom] = useState();
    const [accountNumberTo, setaccountNumberTo] = useState();
    const [accountType, setaccountType] = useState();
    const [amount, setamount] = useState();
    const [ifscCode, setifscCode] = useState();
    const [blocked, setblocked] = useState();
    const [name, setname] = useState();
    const [date, setdate] = useState();
    const [moneyArray, setmoneyArray] = useState([]);
    const [accountArray, setaccountArray] = useState([]);
    const [transaction, setTransaction] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const accountTransaction = (accNo) => {
        setIsLoading(true);
        Api.accountTransaction(accNo).then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                return setmoneyArray(response.data)
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
                return setmoneyArray([]);
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    const getAllAccount = () => {
        setIsLoading(true);
        Api.getAllAccount().then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                return setaccountArray(response.data)
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    const onAccountChange = (e) => {

        const moneyTarget = e.target.value;
        if (_.isEmpty(moneyTarget)) {
            setmoneyArray([])
            return;
        }
        accountTransaction(parseInt(moneyTarget));
    }
    useEffect(() => {
        getAllAccount();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let dataTransaction = {
            "accountNumberFrom": " ",
            "accountNumberTo": " ",
            "accountType": " ",
            "amount": " ",
            "date": " ",
            "ifscCode": " ",
            "name": " "
        }
        const moneyFormData = { accountNumberFrom, accountNumberTo, accountType, amount, ifscCode, name, blocked, date };
        dataTransaction.accountNumberFrom = moneyFormData.accountNumberFrom
        dataTransaction.accountNumberTo = moneyFormData.accountNumberTo
        dataTransaction.accountType = moneyFormData.accountType
        dataTransaction.amount = moneyFormData.amount
        dataTransaction.ifscCode = moneyFormData.ifscCode
        dataTransaction.name = moneyFormData.name
        dataTransaction.date = moneyFormData.date

        setIsLoading(true);
        Api.transferMoney(dataTransaction).then(response => {
            if (response.status === 201) {
                // getAllAccount();
                onreset();
                setIsLoading(false);
                Notification.notifySuccess(response.data)
                return setTransaction(response.data)
            }
        }).catch(reson => {
            if (reson.response.status === 400) {
                setIsLoading(false);
                Notification.notifyError(reson.response.data.message);
            }
            Notification.notifyError("Some error occure !!")
        })
    }
    const onreset = (e) => {
        setaccountNumberFrom('');
        setaccountNumberTo('');
        setamount('');
        setifscCode('');
        setname('');
        setaccountType('');
        setdate('');
        setblocked('');
    }
    return (
        <div>
            <div className='row'>
                <div className="card col-5 customerCard">
                    <div className="card-header">
                    <i class="fa-solid fa-money-bill-transfer"></i>
                        <h1><GiMoneyStack/><GiPayMoney/> Money Transfer</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onSubmit(e)}>
                            {/* <div className="row">
                                <div className="col">
                                    <AutoSuggest
                                        options={allBanksNameData}
                                        handleChange={setaccountNumberFrom}
                                        value={accountNumberFrom}
                                        name="accountNumberFrom"
                                    />
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col">
                                    <label>Account from</label>
                                    <input type="text" value={accountNumberFrom} onChange={(e) => setaccountNumberFrom(e.target.value)} className="form-control" required />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <label> To account</label>
                                    <input type="text" value={accountNumberTo} onChange={(e) => setaccountNumberTo(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label> accountType</label>
                                    <input type="text" value={accountType} onChange={(e) => setaccountType(e.target.value.toUpperCase())} className="form-control" required />
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col">
                                    <label> blocked</label>
                                    <input type="text" value={blocked} onChange={(e) => setblocked(e.target.value)} className="form-control" required />
                                </div>
                            </div> */}
                            {/* <div className="row">
                                <div className="col">
                                <label> id</label>
                                <input type="text" value={id} onChange={(e) => setid(e.target.value)} className="form-control" required />
                                </div>
                            </div> */}

                            <div className="row">
                                <div className="col">
                                    <label>ifscCode</label>
                                    <input type="text" value={ifscCode} onChange={(e) => setifscCode(e.target.value.toUpperCase())} className="form-control"  maxLength="11" minlength="11"  required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>amount</label>
                                    <input type="text" value={amount} onChange={(e) => setamount(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label> date</label>
                                    <input type="text" value={date} onChange={(e) => setdate(e.target.value)} className="form-control" placeholder='YYYY-MM-DD' required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="submit" onClick={() => { }}>Send money</button>
                                </div>
                            </div>
                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="reset" onClick={() => onreset()}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='col-6 cardCustomer-table'>
                    <h2><GiReceiveMoney/> <GiTakeMyMoney/> Get Your Transaction</h2>
                    <select className='form-conrol' onChange={onAccountChange}>
                        <option value={''} selected >--select account--</option>
                        {accountArray.map(ele => {
                            return <option value={ele.accNo}>{ele.name}</option>
                        })}
                    </select>
                    <MoneyTransList moneyArray={moneyArray} transaction={transaction} />
                </div>
                {isLoading && <LoadingSpinner/>}
                <ToastContainer />
            </div>
        </div>
    )
}
