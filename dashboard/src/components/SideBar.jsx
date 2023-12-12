import React from 'react';
import image from '../assets/images/La_letra_dorada_200_69_px.svg'
import ContentWrapper from './ContentWrapper';
import GenresInDb from './GenresInDb';
import ContentRowData from './ContentRowData';
import NotFound from './NotFound';
import {Link, Route, Routes} from 'react-router-dom';
import Chart from './Chart';

function SideBar(){
    return(
        <>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="La Letra Dorada"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - La Letra Dorada</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                <li className="nav-item">
                <Link className="nav-link" to="/genres">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Genres</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <Link className="nav-link" to="/tables">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Tables</span></Link>
                </li>


                <li className="nav-item nav-link">
                <Link className="nav-link" to="/charts">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Charts</span></Link>
                </li>


                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>

            <Routes>
                <Route exact path="/" element={<ContentWrapper />}/>
                <Route path="/genres" element={<GenresInDb />}/>
                <Route path="/tables" element={<ContentRowData />}/>
                <Route path="/charts" element={<Chart/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
            {/*<!-- End of Sidebar -->*/}

        </>
    )
}
export default SideBar;