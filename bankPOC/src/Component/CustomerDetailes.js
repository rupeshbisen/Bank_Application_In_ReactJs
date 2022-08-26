import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Customer-card.css';
import CustomerList from './CustomerList'
import { ToastContainer } from 'react-toastify';
import Api from '../utils/Api';
import Notification from '../utils/Notification';
import { AutoSuggest } from 'react-autosuggestions';
import _ from 'lodash';
import { FcManager } from "react-icons/fc";
import LoadingSpinner from '../utils/LoadingSpinner';

export default function CustomerDetailes() {

    const [customerId, setcustomerId] = useState();
    const [customerName, setcustomerName] = useState('');
    const [address, setaddress] = useState();
    const [panCardNumber, setpanCardNumber] = useState();
    const [aadhaarNumber, setaadhaarNumber] = useState();
    const [mobileNumber, setmobileNumber] = useState();
    const [emailId, setemailId] = useState();
    const [isEdiClick, setIsEdiClick] = useState(false);
    const [customerArray, setcustomerArray] = useState([]);
    const [customerNameData, setcustomerNameData] = useState([]);
    const [mobileNumberData, setmobileNumberData] = useState([]);
    const [emailIdData, setemailIdData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const getAllCustomer = () => {
        setIsLoading(true);
        Api.getAllCustomer().then(response => {
            if (response.status === 200) {
                const customerNameData = response.data.map(ele =>
                    ele.customerName);
                const mobileNumberData = response.data.map(ele =>
                    ele.mobileNumber);
                    const emailIdData = response.data.map(ele =>
                    ele.emailId);
                setcustomerNameData(customerNameData)
                setmobileNumberData(mobileNumberData)
                setemailIdData(emailIdData)
                setIsLoading(false);
                return setcustomerArray(response.data);
            }
            else {

            }
            return;
        });
    }
    useEffect(() => {
        getAllCustomer();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let customerdata = {

            "customerName": " ",
            "address": " ",
            "panCardNumber": " ",
            "aadhaarNumber": " ",
            "mobileNumber": " ",
            "emailId": " "
        }
        let CustomerformData = { customerName, address, panCardNumber, aadhaarNumber, mobileNumber, emailId };
        if (!_.isEmpty(CustomerformData.customerName) && !_.isEmpty(CustomerformData.mobileNumber)&& !_.isEmpty(CustomerformData.emailId)) {
            if (isEdiClick) {

                customerdata.customerName = CustomerformData.customerName
                customerdata.address = CustomerformData.address
                customerdata.panCardNumber = CustomerformData.panCardNumber
                customerdata.aadhaarNumber = CustomerformData.aadhaarNumber
                customerdata.mobileNumber = CustomerformData.mobileNumber
                customerdata.emailId = CustomerformData.emailId

                setIsLoading(true);
                Api.updatecustomer(customerId, customerdata).then(response => {
                    if (response.status === 200) {
                        getAllCustomer();
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
                setIsEdiClick(false);
            }
            else {
                customerdata.customerName = CustomerformData.customerName
                customerdata.address = CustomerformData.address
                customerdata.panCardNumber = CustomerformData.panCardNumber
                customerdata.aadhaarNumber = CustomerformData.aadhaarNumber
                customerdata.mobileNumber = CustomerformData.mobileNumber
                customerdata.emailId = CustomerformData.emailId

                setIsLoading(true);
                Api.postcustomer(customerdata).then(response => {
                    if (response.status === 201) {
                        getAllCustomer();
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
        const data = customerArray[index]
        // customerArray.splice(index, 1);
        setIsEdiClick(true);

        setcustomerId(data.customerId);
        setcustomerName(data.customerName);
        setaddress(data.address);
        setpanCardNumber(data.panCardNumber);
        setaadhaarNumber(data.aadhaarNumber);
        setmobileNumber(data.mobileNumber);
        setemailId(data.emailId);

    }
    const onDataDelete = (data) => {
        setIsLoading(true);
        Api.deletecustomer(data.customerId).then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                Notification.notifySuccess(response.data);
                getAllCustomer();
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
    const onreset = (e) => {
        setcustomerName("");
        setaddress("");
        setpanCardNumber("");
        setaadhaarNumber("");
        setmobileNumber("");
        setemailId("");

    }

    return (
        <div>
            <div className='row'>
                <div className="card col-5 customerCard">
                    <div className="card-header">
                        <h1><FcManager/>  Create Customer</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="row">
                                <div className="col">
                                    <AutoSuggest
                                        options={customerNameData}
                                        handleChange={setcustomerName}
                                        value={customerName}
                                        name="customerName"
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <label> address</label>
                                    <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Pan card No.</label>
                                    <input type="text" value={panCardNumber} onChange={(e) => setpanCardNumber(e.target.value)} className="form-control" minlength="10" maxLength="10" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>aadhaarNumber </label>
                                    <input type="text" value={aadhaarNumber} onChange={(e) => setaadhaarNumber(e.target.value)} className="form-control" minlength="12"maxLength="12" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {/* <AutoSuggest
                                        options={mobileNumberData}
                                        handleChange={setmobileNumber}
                                        value={mobileNumber}
                                        name="mobileNumber"
                                        type='number'
                                    /> */}
                                    <label>mobileNumber</label>
                                    <input type="text" value={mobileNumber} onChange={(e) => setmobileNumber(e.target.value)} className="form-control" minlength="10" maxLength="10" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {/* <AutoSuggest
                                        options={emailIdData}
                                        handleChange={setemailId}
                                        value={emailId}
                                        name="emailId" 
                                    /> */}
                                     <label>emailId</label>
                                    <input type="email" value={emailId} onChange={(e) => setemailId(e.target.value)} className="form-control"  required />
                                </div>
                            </div>

                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="submit" onClick={() => { }} >
                                        {isEdiClick && 'Edit Data'}
                                        {!isEdiClick && 'Save Data'}
                                    </button>
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
                <h1><FcManager/> Customer Details</h1>
                    <CustomerList customerArray={customerArray} onDataEdit={onDataEdit} onDataDelete={onDataDelete} />
                </div>
                {isLoading && <LoadingSpinner />}
                <ToastContainer />
            </div>
        </div>
    )
}

