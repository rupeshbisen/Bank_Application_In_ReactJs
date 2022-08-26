import React from 'react'

export default function Accountlist(props) {
    const { accountArray, onDataEdit, onDataDelete } = props
    return (
        <div className='scroll-Account'>
        <table className="table tableStyle">
            <thead>
                <tr className='table-success'>
                    {/* <th scope="col">Account ID.</th> */}
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">IFSC code</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action Edit</th>
                    <th scope="col">Action Delete</th>
                </tr>
            </thead>
            <tbody>
                {accountArray.map((data, index) =>
                    <tr>
                        {/* <td>{data.accountId}</td> */}
                        <td>{index+1}</td>
                        <td>{data.accNo}</td>
                        <td>{data.name} </td>
                        <td>{data.ifscCode} </td>
                        <td>{data.accountType} </td>
                        <td>{data.amount} </td>
                        <td><button onClick={() => onDataEdit(index)}>Edit</button></td>
                        <td><button onClick={() => onDataDelete(data)}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}
