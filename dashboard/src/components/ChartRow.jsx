import React from 'react';


function ChartRow({title, authors, genres, price}){
    return (
                <tr>
                    <td>{title}</td>
                    <td>{authors[0]}</td>
                    <td>
                        <ul>
                            {genres?.map( (genre,i) => 
                                <li key={`category ${i}`}>{genre}</li>
                            )}
                        </ul>
                    </td>
                    <td>${price}</td>
                </tr>
            )
    }
    
        

export default ChartRow;