import React from 'react';

export default function AccountDetailes(props) {
    const { singleAccount } = props
    return (
        <div>
            {
                <table className="table tableStyle">
                {singleAccount.map((data) =>
                    <>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>

                            <tr>
                                <th scope="col">Bank Id.fhvk</th>
                                <td>{data.bankId}</td>
                            </tr>
                            <tr>
                                <th scope="row">Customer Id. hi</th>
                                <td>{data.customerId}</td>
                            </tr>
                            <tr>
                                <th scope="row">Account Id.</th>
                                <td>{data.accountId}</td>
                            </tr>
                            <tr>
                                <th scope="row">Account No.</th>
                                <td>{data.accNo}</td>
                            </tr>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{data.name} </td>
                            </tr>
                            <tr>
                                <th scope="row">IFSC code</th>
                                <td>{data.ifscCode} </td>
                            </tr>
                            <tr>
                                <th scope="row">Account Type</th>
                                <td>{data.accountType} </td>
                            </tr>
                            <tr>
                                <th scope="row">Amount</th>
                                <td>{data.amount} </td>
                            </tr>
                        </tbody>
                    </>
                )}
            </table>
            }
        </div>
    );
}


