import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function CustomerList(props) {
    const {customerArray,onDataEdit,onDataDelete} = props
    return (
        <div className='scroll-Costomer '>
        <table className="table tableStyle ">
            <thead>
                <tr  className='table-success'>
                    {/* <th scope="col">customer Id.</th> */}
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Pan card No.</th>
                    <th scope="col">Addahar card No.</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">EmailId</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action Edit</th>
                    <th scope="col">Action Delete</th>
                </tr>
            </thead>
            <tbody>
                {customerArray.map((data,index) =>
                    <tr>
                        {/* <td>{data.customerId}</td> */}
                        <td>{index+1}</td>
                        <td>{data.customerName}</td>
                        <td>{data.panCardNumber}</td>
                        <td>{data.aadhaarNumber}</td>
                        <td>{data.mobileNumber}</td>
                        <td>{data.emailId}</td>
                        <td>{data.address}</td>
                        <td><button onClick={()=>onDataEdit(index)}>Edit</button></td>
                        <td><button onClick={()=>onDataDelete(data)}>Delete</button></td>

                    </tr>
                )}
            </tbody>
        </table>
        </div>
    );
}

export default CustomerList;

