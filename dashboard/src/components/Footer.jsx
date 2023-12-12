import React from 'react';

function Footer(){
	const objStyle = {
		color:'white',
		
		}
	const title = {
			color:'black',
			
		}
    return (
        <>
			<footer className="sticky-footer bg-secondary">
				<section class="container row ">
					<nav class="col-12 col-md-6 col-lg-3 col-xl-3">
						<h4 style= {title} className="text-center">Contacto</h4>
						<ul class="nav-text-links">
						<li><a  style= {objStyle} href="#">Tel: 0800 565-3232</a></li>
						<li><a style= {objStyle} href="#">Whatsapp: (+54)11 543-0334 </a></li>
						<li><a  style= {objStyle} href="#">laletradorada@dorada.com</a></li>
						<li><a style= {objStyle} href="#">laletradoradareclamos@gmail.com</a></li>
						</ul>
					</nav>
					
					<nav class="col-12 col-md-6 col-lg-3 col-xl-3">
						<h4 style= {title} className="text-center">Información legal</h4>
						<ul>
						<li><a style= {objStyle} href="#" className="link-light">Terminos y condiciones</a></li>
						<li><a style= {objStyle} href="#" className="link-light">Politica de devoluciones y anulacion</a></li>
						<li><a style= {objStyle} href="#"  className="link-light">Politica de proteccion de datos</a></li>
						</ul>
					</nav>
					
					<nav class="col-12 col-md-6 col-lg-3 col-xl-3">
						<h4 style= {title} className="text-center">Servicios</h4>
						<ul >
						<li><a style= {objStyle} href="#">Venta a Empresas e instituciones</a></li>
						<li><a style= {objStyle} href="#">Compra Recurrente</a></li>
						<li><a style= {objStyle} href="#">Libros al por mayor</a></li>
						<li><a style= {objStyle} href="#">Preventa</a></li>
						</ul>
					</nav>
	
				<div class="col-12 col-md-6 col-lg-3 col-xl-3">
					<h4 style= {title}>Siguenos en </h4>
					<a href="#"><i class="fab fa-facebook fa-2x text-light"></i></a>
					<a href="#"><i class="fab fa-instagram fa-2x px-4 text-light "></i></a>
					<a href="#"><i class="fab fa-twitter fa-2x text-light"></i></a>
				</div>
		</section>

		<div class="container-center margin-top-8">
		<p class="text-center text-light">
			©1997-2023 Dashboard LaLetraDorada.com®.
		</p>
		</div>
			</footer>

        </>
    )
}
export default Footer;