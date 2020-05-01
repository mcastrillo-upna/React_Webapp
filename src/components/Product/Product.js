import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {
    

    render() {
        return (
            <article className="Product">
                <div className="divimagen">
                    <img width="160px" src={this.props.image} alt="product"></img>
                </div>
                <div className="text col-sm-6">
                    <h5>{this.props.name}</h5>
                    <p>{this.props.description}</p>
                    <h4>{this.props.price} €</h4>
                </div>
                <div className="quantity">
                    <Button className="boton" variant="info" onClick={this.props.substractQuantity}>-</Button>
                    {this.props.quantity}
                    <Button className="boton" variant="info" onClick={this.props.addQuantity}>+</Button>
                </div>
            </article>
        )

    }

};

Product.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    addQuantity: PropTypes.func,
    substractQuantity: PropTypes.func,
}

export default Product;