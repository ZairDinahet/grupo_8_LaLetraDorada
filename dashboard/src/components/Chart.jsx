import React, {useContext} from 'react';
import ChartRow from './ChartRow';
import { dataContext } from '../context/DataContext'

function Chart (){
    const objStyle = {
		backgroundColor:" #232343",	
        }
    const { products } = useContext(dataContext)

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr className='text-white' style= {objStyle}>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Género</th>
                                <th>Precio Tapa Dura</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Género</th>
                                <th>Precio Tapa Dura</th>
                            </tr>
                        </tfoot>
                        <tbody className='bg-secondary text-white'>
                            {
                                products.data.products.map((row, i) => {
                                    return <ChartRow {...row} key={i} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;