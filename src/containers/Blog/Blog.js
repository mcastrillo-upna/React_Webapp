import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

import './Blog.css';
import ProductList from './../ProductList/ProductList';
import OrderSummary from './../OrderSummary/OrderSummary';
import OrderInfo from './../OrderInfo/OrderInfo';
import OrderList from './../OrderList/OrderList';
import Greetings from './../Greetings/Greetings';
import Login from './../Login/Login';
import logo from './../logo.png';

class Blog extends Component {
    state = {
        auth: false,
        authData: {},
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token != null) {
            this.setState({ auth: true });
            this.setState({ authData: { ...token } });
        }
    }

    setAuthentication = (auth, data) => {
        this.setState({ auth: auth });
        this.setState({ authData: data });
    }

    myCallback = (dataFromChild) => {
        this.setState({
            products: dataFromChild
        });
    }

    logOut() {
        localStorage.removeItem('token');
        this.setState({
            auth: false,
            authData: {},
        });
    }


    render() {

        let login = <li><NavLink
            to="/login"
            exact
            activeClassName="my-active"
        >Login</NavLink></li>;
        if (this.state.auth) {
            login =
                <Fragment>
                    <li className="login">Hola, {this.state.authData.email}</li>
                    <li onClick={() => this.logOut()}>
                        <NavLink
                            to="">
                            <div className="links">Cerrar sesión</div>
                        </NavLink>
                    </li>
                </Fragment>;
        }

        return (
            <div className="Blog">
                <header>
                    <Navbar bg="dark" variant="dark" expand="md">
                        <Navbar.Brand href="/products">
                            <img
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="I"
                            />
                        </Navbar.Brand>
                        <Navbar.Brand href="/products">Melomaniac!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <ul>
                                    <li><NavLink
                                        to="/products"
                                        exact
                                        activeClassName="my-active"
                                    >Productos</NavLink></li>
                                    <li><NavLink
                                        to='/orders'
                                        exact
                                        activeClassName="my-active"
                                    >Pedidos</NavLink></li>
                                    {login}
                                </ul>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </header>

                <Switch>
                    <Route path="/products" render={(props) => <ProductList {...props} callbackFromParent={this.myCallback} />} />
                    <Route path="/orders" render={(props) => <OrderList {...props} email={this.state.authData.email} />} />
                    <Route path="/login" render={(props) => <Login {...props} auth={this.state.auth} setAuthentication={this.setAuthentication} />} />
                    <Route path="/summary" render={(props) => <OrderSummary {...props} products={this.state.products} />} />
                    <Route path="/order-info" render={(props) => <OrderInfo {...props} products={this.state.products} />} />
                    <Route path="/greetings" render={() => <Greetings />} />
                    <Redirect from="/" to="/products" />
                </Switch>
            </div >
        );
    }
}

export default Blog;