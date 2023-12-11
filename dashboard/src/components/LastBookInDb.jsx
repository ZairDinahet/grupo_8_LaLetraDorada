import React from 'react';
import img from "../assets/images/404.jpg"

function LastBookInDb({product}){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last book in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={product.data ? product.data.coverImg : img} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>{product.data? product.data.description : ""}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastBookInDb;
