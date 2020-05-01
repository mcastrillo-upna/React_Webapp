import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './FullOrder.css';

class FullOrder extends React.Component {

    calculateProductPrice = (product) => {
        let totalprice = product.price * product.quantity;
        return totalprice;
    }

    render() {
        let products = this.props.products.map(product => {
            return (
                <div key={this.props.id + product.name} className="row">
                    {product.quantity} x {product.name} = {this.calculateProductPrice(product)} €
                </div>
            );

        });

        return (
            <Container className="FullOrderCont">
                <h5>Datos del cliente </h5>
                <Row>
                    <Col>
                        <p><b>Cliente: </b> {this.props.info.name} {this.props.info.surname}</p>
                    </Col>
                    <Col>
                        <p><b>Email: </b> {this.props.info.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Col><p><b>Dirección: </b> {this.props.info.address}, {this.props.info.postalcode} {this.props.info.location} ({this.props.info.region})</p></Col>
                </Row>

                <h5>Información de pago </h5>
                <Row>
                    <Col>
                        <div className="row"><p><b>Nº de tarjeta: </b> {this.props.info.card}</p></div>
                        <div className="row"><p><b>Caducidad: </b> {this.props.info.expiration}</p></div>
                        <div className="row"><p><b>CVC: </b> {this.props.info.cvc}</p></div>
                    </Col>
                </Row>

                <h5>Productos </h5>
                <Row>
                    <Col>
                        {products}
                    </Col>
                </Row>
            </Container >
        )

    }

};

FullOrder.propTypes = {
    id: PropTypes.string,
    info: PropTypes.object,
    products: PropTypes.array,
}

export default FullOrder;