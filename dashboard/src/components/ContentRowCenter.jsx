import React from 'react';
import LastBookInDb from './LastBookInDb';
import GenresInDb from './GenresInDb';

function ContentRowCenter(){


    return (
        <div className="row">
            {/*<!-- Last Book in DB -->*/}
            <LastBookInDb />
            {/*<!-- Genres in DB -->*/}
            <GenresInDb />
        </div>
    )
}

export default ContentRowCenter;