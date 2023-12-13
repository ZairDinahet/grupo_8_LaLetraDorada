import React, { useContext } from 'react';
import SmallCard from './SmallCard';
import { dataContext } from '../context/DataContext';


function ContentRowData(){

    const {products, users } = useContext(dataContext) 

    let cartProps = [ 
        {
            title: 'Books in Data Base',
            color: 'primary', 
            cuantity: products.meta ? products.meta.count : 0,
            icon: 'fa-solid fa-book'
        },
        {
            title:' Total Users', 
            color:'success', 
            cuantity:  users.meta ? users.meta.count : 0,
            icon:'fa-user-check'
        },
        {
            title:'Total Genres' ,
            color:'warning',
            cuantity: products.meta ? products.data.countByCategory.length : 0,
            icon:'fa-solid fa-star'
        }
    ];
    
    return (
        
        <div className="row">
            
            {cartProps.map( (data, i) => {

                return <SmallCard {...data} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowData;