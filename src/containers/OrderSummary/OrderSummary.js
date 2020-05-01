import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './OrderSummary.css';

class OrderSummary extends Component {

    calculateTotal = () => {
        let total = 0;
        for (let i in this.props.products) {
            total = total + this.props.products[i].price * this.props.products[i].quantity;
        }
        return total;
    }

    calculateProductPrice = (product) => {
        let totalprice = product.price * product.quantity;
        return totalprice;
    }

    render() {
        let cart = <tr></tr>;
        let orderbutton =
            <Link to="/order-info">
                <Button type="button" variant="info"> Tramitar pedido </Button>
            </Link>;

        // Comprobar si las props existen
        try {

            if (this.props.products) { }
            cart = this.props.products.map(product => {
                return (
                    <tr key={product.idb}>
                        <td>{product.quantity}</td>
                        <td>{product.name}</td>
                        <td>{product.price} €</td>
                        <td>{this.calculateProductPrice(product)}</td>
                    </tr>
                );
            });


        } catch (errorInfo) {
            // Si no se pueden obtener las propiedades desde productos
            orderbutton = "El carro está vacío."
        }

        return (
            <div className="OrderSummary">
                <h2>Resumen del carrito</h2>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Precio/ud</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart}
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="2"></th>
                            <th>Total</th>
                            <th>{this.calculateTotal()} €</th>
                        </tr>
                    </thead>
                </Table>
                <p>{orderbutton}</p>
                <Link to="/products">
                    <Button type="button" variant="info"> Volver </Button>
                </Link>
            </div >

        );
    }
}

OrderSummary.propTypes = {
    products: PropTypes.array,
}

export default OrderSummary;


