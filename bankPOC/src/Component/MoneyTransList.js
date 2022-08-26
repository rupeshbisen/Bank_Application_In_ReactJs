import React from 'react';

export default function MoneyTransList(props){
    const { moneyArray} = props
    return (
        <div className='scroll'>
        <table className="table tableStyle">
            <thead>
                <tr className='table-success'>
                    <th scope="col">Sr.No.</th>
                    <th scope="col">accountNumberFrom</th>
                    <th scope="col">accountNumberTo</th>
                    <th scope="col">IFSC code</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Amount</th>
                    {/* <th scope="col">blocked</th> */}
                    <th scope="col">name</th>
                    <th scope="col">date</th>
                    <th scope="col">id</th>
                </tr>
            </thead>
            <tbody>
                {moneyArray.map((data,index) =>
                    <tr>
                        <td>{index+1}</td>
                        <td>{data.accountNumberFrom}</td>
                        <td>{data.accountNumberTo} </td>
                        <td>{data.ifscCode} </td>
                        <td>{data.accountType} </td>
                        <td>{data.amount} </td>
                        {/* <td>{data.blocked} </td> */}
                        <td>{data.name} </td>
                        <td>{data.date} </td>
                        <td>{data.id} </td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    );
}

