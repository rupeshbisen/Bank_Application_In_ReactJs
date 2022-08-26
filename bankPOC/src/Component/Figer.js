import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import saving from "./Img/saving.jpg";


const Figer = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-6'>
                    <img src={saving} alt="saving" />
                </div>
                <div className='col-6 '>
                    <div class="card">
                        <div className="card-body">
                            <h1> Welcome To Banking</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Figer;
