import React, {useContext} from "react";
import { dataContext } from '../context/DataContext';

function GenresInDb() {
  const { products } = useContext(dataContext)

  const miEstilo = {
    color : "#272343",
    backgroundColor:"#B9E7EF"
  };
  const miEstilo2 = {
    backgroundColor:"#272343"
  };
  
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div style={miEstilo} className="card-header py-3">
          <h5 className="m-0 font-weight-bold">
            Genres in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {
              products.data.countByCategory.map(genre => {
                return (
                  <div className="col-lg-6 mb-1" key={genre.genero}>
                    <div style={miEstilo2} className="card text-white shadow">
                      <div className="card-body">{genre.genero} - {genre.cantidad_De_Libros}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
