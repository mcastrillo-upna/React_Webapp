import React, { Component } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import './OrderInfo.css';

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }
    
    state = {
        info: {
            name: '',
            surname: '',
            email: '',
            address: '',
            location: '',
            region: '',
            postalcode: '',
            card: '',
            expiration: '',
            cvc: '',
        },
        // submitted: false,
    }

    componentDidMount() {
        this.inputElement.current.focus();
    }

    orderDataHandler = () => {
        const data = {
            info: this.state.info,
            products: this.props.products,
        };
        axios.post('/orders.json', data)
            .then(response => {
                // alert('Saved order');
                //console.log(response);
                this.setState({ submitted: true });
                //this.props.history.push('/posts');
            });
    }

    render() {
        // let redirectsubmitted = null;
        let redirectempty = null;
        // console.log(redirectempty);
        try {
            // console.log("he entrado en el try")
            if (this.props.products) { 

            } else {
                redirectempty = <Redirect to="/products" />;
            }
                // console.log("He entrado")
        
        } catch (errorInfo) {
            // Si no se pueden obtener las propiedades desde productos
            redirectempty = <Redirect to="/products" />;
            console.log("he entrado en el catch")
        }

        // console.log(redirectempty)
        // if (this.state.submitted) {
        //     redirectsubmitted = <Redirect to="/greetings" />;
        // }
        return (
            <div className="OrderInfo">
                {redirectempty}
                {/* {redirectsubmitted} */}
                <h3>Tus datos personales</h3>
                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={this.state.info.name}
                                ref={this.inputElement}
                                onChange={(event) => this.setState({ info: { ...this.state.info, name: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                value={this.state.info.surname}
                                onChange={(event) => this.setState({ info: { ...this.state.info, surname: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={this.state.info.email}
                                onChange={(event) => this.setState({ info: { ...this.state.info, email: event.target.value } })}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Dirección postal</Form.Label>
                        <Form.Control
                            value={this.state.info.address}
                            onChange={(event) => this.setState({ info: { ...this.state.info, address: event.target.value } })}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Localidad</Form.Label>
                            <Form.Control
                                value={this.state.info.location}
                                onChange={(event) => this.setState({ info: { ...this.state.info, location: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegion">
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control
                                value={this.state.info.region}
                                onChange={(event) => this.setState({ info: { ...this.state.info, region: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                                value={this.state.info.postalcode}
                                onChange={(event) => this.setState({ info: { ...this.state.info, postalcode: event.target.value } })}
                            />
                        </Form.Group>
                    </Form.Row>

                </Form>

                <h3>Tus datos de pago</h3>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCredit">
                            <Form.Label>Número de tarjeta</Form.Label>
                            <Form.Control
                                value={this.state.info.card}
                                onChange={(event) => this.setState({ info: { ...this.state.info, card: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridExpiration">
                            <Form.Label>Caducidad</Form.Label>
                            <Form.Control
                                value={this.state.info.expiration}
                                onChange={(event) => this.setState({ info: { ...this.state.info, expiration: event.target.value } })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCVC">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                                value={this.state.info.cvc}
                                onChange={(event) => this.setState({ info: { ...this.state.info, cvc: event.target.value } })}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Link to="/greetings">
                    <Button type="button" onClick={this.orderDataHandler} variant="info"> Confirmar pedido </Button>
                </Link>
            </div>
        );
    }
}

OrderInfo.propTypes = {
    products: PropTypes.array,
}

export default OrderInfo;