import React from 'react';
// import PropTypes from 'prop-types';

function SmallCard(props){
    const miEstilo = {
        color : "#272343"
    };
    return(
        <div className="col-md-4 mb-4">
            <div className={`card border-left-${props.color} shadow `}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-4">
                            <div className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}> {props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.cuantity}</div>
                        </div>
                        <div className="col-auto">
                            <i style={miEstilo} className={`fas ${props.icon} fa-2x `}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

SmallCard.defaultProps = {
    title: 'No Title',
    color: 'success',
    cuantity: 'No cuatity',
    icon: 'fa-clipboard-list'
}

/* PROPTYPES */

// SmallCard.propTypes = {
//     atritutes: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         color: PropTypes.string.isRequired,
//         cuantity: PropTypes.oneOfType([
//             PropTypes.string,
//             PropTypes.number
//         ]).isRequired,
//         icon: PropTypes.string.isRequired
//     })
// }



export default SmallCard;