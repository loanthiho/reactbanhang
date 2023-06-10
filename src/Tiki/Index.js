// import React, { Component } from 'react';
import {Link} from "react-router-dom"
const Index = ()=> {  
        return (
            <div>
            
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <ul className='navbar-nav mr-auto'>
                        <li><Link to={'/Home'} className='nav-link'>Home</Link></li>
                        <li><Link to={'/Show_Tiki'} className='nav-link'>Admin</Link></li>
                    </ul>
                </nav>
                <hr/>
            </div>
        );
}

export default Index;