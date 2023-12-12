import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowData from './ContentRowData'
import Chart from './Chart';

function ContentRowTop(){

    return(
        <>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard - La Letra Dorada</h1>
					</div>

                    <ContentRowData/>
                    <ContentRowCenter/>
                    <Chart/>
				</div>
				{/*<!--End Content Row Top-->*/}

        </>
    )

}
export default ContentRowTop;