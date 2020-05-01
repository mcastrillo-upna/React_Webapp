import React, { Component, Fragment } from 'react';
import axios from '../../axios';
import { Table } from 'react-bootstrap';
import FullOrder from '../../components/FullOrder/FullOrder';
import PropTypes from 'prop-types';
import './OrderList.css';
import bin from './../bin.png';

class OrderList extends Component {
    state = {
        orders: [],
        error: false,
        selectedOrderId: null,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        idb: key,
                    });
                }
                if (typeof this.props.email !== 'undefined'){
                    orders = orders.filter(order => order.info.email === this.props.email);
                }
                this.setState({ orders: orders });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    calculateTotal = (products) => {
        // Mandamos la información de los productos a Blog
        let total = 0;
        for (let i in products) {
            total = total + products[i].price * products[i].quantity;
        }
        return total;
    }

    deleteOrderHandler = (idb) => {
        axios.delete('/orders/' + idb + '.json')
            .then(response => {
                alert('Order deleted');
                window.location.reload(false);
            });
    }

    orderSelectedHandler = (id) => {
        this.setState({ selectedOrderId: id });
    }
    onClickHandler = (e) => {
        const hiddenElement = e.currentTarget.nextSibling;
        hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
    };

    render() {
        let list = <tr></tr>;
        let message = '';
        let messagelogin = '';

        if (typeof this.props.email === 'undefined'){
            messagelogin = <h5>Mostrando los pedidos de todos los usuarios.</h5>;
        } else {
            messagelogin = <h5>Mostrando los pedidos de {this.props.email}</h5>;
        }

        if (this.state.orders.length !== 0) {
            list = this.state.orders.map(({ idb, info, products }) => {
                return (
                    // El elemento Fragment permite que el return tenga un elemento padre sin añadir funcionalidades
                    <Fragment key={idb}>
                        <tr onClick={this.onClickHandler}>
                            <td>{idb}</td>
                            <td>{info.email}</td>
                            <td>{this.calculateTotal(products)} €</td>
                            <td >
                                <img
                                    className="paperbin"
                                    src={bin}
                                    width="30"
                                    height="30"
                                    alt='papelera'
                                    onClick={() => this.deleteOrderHandler(idb)} />
                            </td>
                        </tr>
                        <tr className="collapse">
                            <td colSpan="6">
                                <div>
                                    <FullOrder id={idb} info={info} products={products} />
                                </div>
                            </td>
                        </tr>

                    </Fragment>
                );
            });

        }
        else {
            // Si no se pueden obtener las propiedades desde productos
            message = "Aún no hay pedidos."
        }

        return (
            <div className="OrderSummary">
                <h2>Pedidos realizados</h2>
                {messagelogin}
                <p>Selecciona un producto para ver los detalles</p>
                
                {/* <section>
                    <FullOrder id={this.state.selectedOrderId} />
                </section> */}
                <Table responsive striped bordered hover className="table">

                    {/* <table class="table table-hover"> */}
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Email</th>
                            <th>Importe</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table >
                {message}
            </div >

        );
    }
}

OrderList.propTypes = {
    email: PropTypes.string,
}

export default OrderList;