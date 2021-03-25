import React, { Component, useState } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { logout } from '../services/loginService';

export default function Logout() {

    return (
        <React.Fragment>
        <Navbar />
        <Banner />
        <div className='logout-body'>
            <div className='logout-form'>
                <p>Do you want to log out?</p>
                <input type='button' value='Logout' onClick={() => logout()}/>
            </div>
        </div>
        <Bottom />
      </React.Fragment>
    )

}