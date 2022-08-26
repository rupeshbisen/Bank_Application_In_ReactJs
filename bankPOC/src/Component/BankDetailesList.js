import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function BankDetailesList(props) {
    const { dataArray,onDataDelete,onDataEdit } = props
    return (
        <div className='scroll'>
        <table className="table tableStyle">
            <>  <thead>
                <tr className='table-success'>
                    {/* <th scope="col">Bank Id</th> */}
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Bank name</th>
                    <th scope="col">IFSC code</th>
                    <th scope="col">Branch name</th>
                    <th scope="col">City</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action Edit</th>
                    <th scope="col">Action Delete</th>
                </tr>
            </thead>
                <tbody>
                    {dataArray.map((data,index) =>
                        <tr>
                            {/* <td>{data.bankId}</td> */}
                            <td>{index+1}</td>
                            <td> {data.bankName}</td>
                            <td> {data.ifscCode}</td>
                            <td> {data.branchName}</td>
                            <td> {data.city}</td>
                            <td> {data.address}</td>
                            <td> <button onClick={()=>onDataEdit(index)}>Edit</button></td>
                            <td> <button onClick={()=>onDataDelete(data)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </>
        </table>
        </div>
    )

}
export default BankDetailesList;

