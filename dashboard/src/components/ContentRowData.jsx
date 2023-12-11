import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

function ContentRowData({totalProducts, totalGenres, totalUsers}){
    
        let booksInDB = {
            title: 'Books in Data Base',
            color: 'primary', 
            cuantity: totalProducts,
            icon: 'fa-clipboard-list'
        }
        
        /* <!-- Total awards --> */
        
        let usersInDB = {
            title:' Total Users', 
            color:'success', 
            cuantity: totalUsers,
            icon:'fa-award'
        }
        
        /* <!-- Actors quantity --> */
        
        let genresInDB = {
            title:'Total Genres' ,
            color:'warning',
            cuantity: totalGenres,
            icon:'fa-user-check'
        }
        
        let cartProps = [booksInDB, usersInDB, genresInDB];
    return (
        
        <div className="row">
            
            {cartProps.map( (data, i) => {

                return <SmallCard {...data} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowData;