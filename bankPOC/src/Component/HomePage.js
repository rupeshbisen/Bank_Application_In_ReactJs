import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Images1 from "./Img/homeSlide1.jpg";
import Images2 from "./Img/homeSlide2.jpg";
import Images3 from "./Img/homeSlide3.jpg";
import Images4 from "./Img/homeSlide4.jpg";
import { Carousel } from 'bootstrap';
import './css/First_page.css';
import LoginPage from './LoginPage';


export default function HomePage() {

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Images1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Images2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Images3} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Images4} className="d-block w-100" alt="..." />
                    </div>
                    <div className='row'>
                        <div className='col-2'>
                            <a href='/BankDetailes'><button type='button' className='createButton' ><span>Get Bank</span></button></a>
                        </div>
                        <div className='col-2'>
                            <a href='/CustomerDetailes'><button type='button' className='createButton' ><span>Customer</span></button></a>
                        </div>
                        <div className='col-2'>
                            <a href='/AccountOpening'><button type='button' className='createButton' ><span>Accounts</span></button></a>
                        </div>
                        <div className='col-2'>
                            <a href='/MoneyTrans'><button type='button' className='createButton' ><span>Transactions</span></button></a>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
