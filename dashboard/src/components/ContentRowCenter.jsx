import React from 'react';
import LastBookInDb from './LastBookInDb';
import GenresInDb from './GenresInDb';

function ContentRowCenter({genres, product}){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastBookInDb product = {product} />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb genres = {genres} />

        </div>
    )
}

export default ContentRowCenter;