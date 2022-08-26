import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Customer-card.css';
import BankDetailesList from './BankDetailesList';
import { ToastContainer } from 'react-toastify';
import Api from '../utils/Api';
import Notification from '../utils/Notification';
import { AutoSuggest } from 'react-autosuggestions';
import _ from 'lodash';
import { RiBankFill ,RiBankLine} from "react-icons/ri";
import LoadingSpinner from '../utils/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const BankDetailes = () => {

    const [bankId, setBankId] = useState();
    const [bankName, setBankName] = useState('');
    const [ifscCode, setifscCode] = useState();
    const [branchName, setbranchName] = useState();
    const [city, setcity] = useState();
    const [address, setaddress] = useState();
    const [isEdiClick, setIsEdiClick] = useState(false);
    // const [currnetEditIndex, setCurrentEditIndex] = useState(0);
    const [dataArray, setDataArray] = useState([])
    const [allBanksNameData, setAllBanksNameData] = useState([])
    const [allBanksIFSCCOde, setAllBanksIFSCCOde] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const getAllBank = () => {
        setIsLoading(true);
        Api.getAllBank().then(response => {
            if (response.status === 200) {
                const allBanksNameData = response.data.map(ele =>
                    ele.bankName);
                const allBanksIFSCCOde = response.data.map(ele =>
                    ele.ifscCode);
                setAllBanksNameData(allBanksNameData)
                setAllBanksIFSCCOde(allBanksIFSCCOde)
                setIsLoading(false);
                return setDataArray(response.data);
            } else {

            }
            return;
        });
    }
    useEffect(() => {
        getAllBank();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let bankData = {
            bankName: "",
            ifscCode: "",
            "branchName": "",
            "city": "",
            "address": ""
        };
        let formData = { bankName, ifscCode, branchName, city, address };
        if (!_.isEmpty(formData.bankName) && !_.isEmpty(formData.ifscCode)) {
            // if(formData.ifscCode.length === 11){
            if (isEdiClick) {

                bankData.bankName = formData.bankName;
                bankData.ifscCode = formData.ifscCode;
                bankData.branchName = formData.branchName;
                bankData.city = formData.city;
                bankData.address = formData.address;
                
                setIsLoading(true);
                Api.updateBankId(bankId, bankData).then(response => {
                    if (response.status === 200) {
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
                setIsEdiClick(false);
            }
            else {
                bankData.bankName = formData.bankName;
                bankData.ifscCode = formData.ifscCode;
                bankData.branchName = formData.branchName;
                bankData.city = formData.city;
                bankData.address = formData.address;

                setIsLoading(true);
                Api.postBank(bankData).then(response => {
                    if (response.status === 201) {
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
        // }
        // else{ Notification.notifyError("IFSC code should be 11 digit")}
        }
        else {
            Notification.notifyError("please fill all required fields")
        }
        return;
    }
    const onDataEdit = (index) => {
        const data = dataArray[index]
        //    dataArray.splice(index,1);
        setIsEdiClick(true);
        // setCurrentEditIndex(index);

        setBankId(data.bankId);
        setBankName(data.bankName);
        setifscCode(data.ifscCode);
        setbranchName(data.branchName);
        setcity(data.city);
        setaddress(data.address);

    }
    const onDataDelete = (data) => {
        setIsLoading(true);
        Api.deleteBank(data.bankId).then(response => {
            if (response.status === 200) {
                setIsLoading(false);
                Notification.notifySuccess(response.data);
                getAllBank();
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
        setBankId('');
        setBankName('');
        setifscCode('');
        setbranchName('');
        setcity('');
        setaddress('');
    }
    return (
        <div>
            <div className='row'>
                <div className="card col-5 bankCard">
                    <div className="card-header">
                        <h1><RiBankLine/> Create A Bank</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="row">
                                <div className="col">
                                    <AutoSuggest
                                        options={allBanksNameData}
                                        handleChange={setBankName}
                                        value={bankName}
                                        name="bankName"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {/* <AutoSuggest
                                        options={allBanksIFSCCOde}
                                        handleChange={setifscCode}
                                        value={ifscCode}
                                        name="ifscCode"
                                    /> */}
                                     <label>ifscCode </label>
                                    <input type="text" value={ifscCode} onChange={(e) => setifscCode(e.target.value.toUpperCase())} className="form-control"  maxLength="11" minlength="11" placeholder='Format should be : ABCD1234567' required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>BranchName </label>
                                    <input type="text" value={branchName} onChange={(e) => setbranchName(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>City</label>
                                    <input type="text" value={city} onChange={(e) => setcity(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>address</label>
                                    <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} className="form-control" required />
                                </div>
                            </div>
                            <div>
                                <div className="d-grid gap-2 submitBtn">
                                    <button className="btn btn-primary" type="submit" onClick={() => { }}>
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
                    <h1><RiBankFill/> Bank Detailes</h1>
                    <BankDetailesList dataArray={dataArray} onDataDelete={onDataDelete} onDataEdit={onDataEdit} />
                </div>
                <ToastContainer />
                {isLoading && <LoadingSpinner />}
            </div>
        </div>
    );
}

export default BankDetailes;
