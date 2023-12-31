import React, {useContext} from 'react';
import { dataContext } from '../context/DataContext';
import img from "../assets/images/404.jpg"

function LastBookInDb(){
    const { lastProduct} = useContext(dataContext)
    const miEstilo = {
        color : "#272343",
        backgroundColor:"#B9E7EF"
    };
    const miEstilo2 = {
        color : "white",
        backgroundColor:"#272343"
    };
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div style={miEstilo} className="card-header py-3">
                    <h5 className="m-0 font-weight-bold">Last book in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 27 +'rem'}} src={lastProduct ? lastProduct.data.coverImg : img} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>{lastProduct? lastProduct.data.description : ""}</p>
                    <a style={miEstilo2} className="btn " target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastBookInDb;