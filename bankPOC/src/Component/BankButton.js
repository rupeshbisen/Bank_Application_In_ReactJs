import React from 'react'

const bank = [
    { bankName: "State Bank of India", },
    { bankName: "HDFC Bank " },
    { bankName: "Kotak Mahindra Bank" },
    { bankName: "Bank of Maharashtra" },
]
const bank2 = [
    { bankName: "IndusInd Bank" },
    { bankName: "Axis Bank" },
    { bankName: "Bank of India" },
    { bankName: "Union Bank of India" }
]

export default function BankButton() {

    return (
        <div>
            <div className='row'>
                {bank.map(ele => {
                    return <div className='col-3'>
                        <div className="card ">
                            <div className="card-body">
                                {ele.bankName}
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
            <div className='row'>
                {bank2.map(ele => {
                    return <div className='col-3'>
                        <div className="card ">
                            <div className="card-body">
                                {
                                    ele.bankName
                                }
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    );
}

