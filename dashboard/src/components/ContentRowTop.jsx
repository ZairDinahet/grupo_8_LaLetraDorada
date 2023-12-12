import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowData from './ContentRowData'
import Chart from './Chart';

function ContentRowTop(){
    const miEstilo = {
        color : "#272343"
    };
    return(
        <>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 style={miEstilo} className="h3 mb-0 font-weight-bold">App Dashboard</h1>
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