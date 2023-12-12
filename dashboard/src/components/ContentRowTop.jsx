import React, { useEffect, useState } from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowData from './ContentRowData'
import Chart from './Chart';
import { getProducts, getOneProduct } from '../queries/productsApi';
import { getUsers } from '../queries/usersApi';

function ContentRowTop(){
    const[products, setProducts] = useState([])
    const[users, setUsers] = useState([])
    const [lastProduct, setLastProduct] = useState([])

    async function getData(){
        const dataProducts = await getProducts()
        const dataUsers = await getUsers()
        const dataOneProduct = await getOneProduct(dataProducts.data.products[dataProducts.data.products.length - 1].id)
        
        setLastProduct(dataOneProduct)
        setProducts(dataProducts)
        setUsers(dataUsers)
    }
	useEffect( () => {
        getData()
    },[])
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

                {
                    (products.meta && users.meta && lastProduct.meta) ? 
                    <>
                    <ContentRowData
                        totalProducts={products.meta.count}
                        totalUsers={ users.meta.count}
                        totalGenres={products.data.countByCategory.length}
                    />
                    <ContentRowCenter genres={products.data.countByCategory} product={lastProduct} />
                    <Chart totalProducts={products} />
                    </>
                    :
                    <p>Cargando...</p>
                }


				</div>
				{/*<!--End Content Row Top-->*/}

        </>
    )

}
export default ContentRowTop;