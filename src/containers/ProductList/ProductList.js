import React, { Component } from 'react';
import axios from '../../axios';
// import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Product from '../../components/Product/Product';
import './ProductList.css';
import PropTypes from 'prop-types';

class ProductList extends Component {
    state = {
        products: [],
    }

    componentDidMount() {
        axios.get('/products.json')
            .then(response => {
                let products = [];
                for (let key in response.data) {
                    products.push({
                        ...response.data[key],
                        idb: key,
                        quantity: 0
                    });
                }
                // console.log(products);
                this.setState({ products: products });
            }).catch(error => {
                this.setState({ error: true });
            });
    }


    addQuantity = (id) => {
        // console.log("sumar" + id);
        let products_aux = this.state.products;
        products_aux[id].quantity = products_aux[id].quantity + 1;
        this.setState({
            products: products_aux,
        });
        this.infoParent();
    }

    substractQuantity = (id) => {
        // console.log("restar" + id);
        if (this.state.products[id].quantity > 0) {
            let products_aux = this.state.products;
            products_aux[id].quantity = products_aux[id].quantity - 1;
            this.setState({
                products: products_aux,
            });
        }
        this.infoParent();
    }

    infoParent = () => {
        let products = this.state.products.filter(product => product.quantity !== 0);
        this.props.callbackFromParent(products);
    }

    calculateTotal = () => {
        // Mandamos la información de los productos a Blog
        let total = 0;
        for (let i in this.state.products) {
            total = total + this.state.products[i].price * this.state.products[i].quantity;
        }
        return total;
    }

    render() {
        let products = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            products = this.state.products.map(product => {
                return (
                    <section key={product.idb} className="ProductList">
                        <Product
                            key={product.idb}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            quantity={product.quantity}
                            addQuantity={() => this.addQuantity(product.idb)}
                            substractQuantity={() => this.substractQuantity(product.idb)} />
                    </section>
                );

            });

        }

        return (
            <div>
                {products}
                <div className="pedido">
                    <h4>Total: {this.calculateTotal()} €</h4>
                    <Link to="/summary">
                        <Button type="button" variant="info"> Tramitar pedido </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

ProductList.propTypes = {
    callbackFromParent: PropTypes.func,
}

export default ProductList;


