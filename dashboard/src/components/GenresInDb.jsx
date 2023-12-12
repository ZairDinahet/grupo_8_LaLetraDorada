import React, {useContext} from "react";
import { dataContext } from '../context/DataContext';

function GenresInDb() {
  const { products } = useContext(dataContext)

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Genres in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {
              products.data.countByCategory.map(genre => {
                return (
                  <div className="col-lg-6 mb-4" key={genre.genero}>
                    <div className="card bg-dark text-white shadow">
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
