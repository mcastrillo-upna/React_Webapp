import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Greetings.css';

class Greetings extends React.Component {
    

    render() {
        return (
            <div className="Greetings">
                <h2>¡Muchas gracias por confiar en nosotros!</h2>
                <p>Tu pedido llegará pronto, mientras puedes visitar nuestra tienda para comprar de nuevo.</p>
                <Link to="/products">
                    <Button type="button" variant="info"> Realizar un nuevo pedido </Button>
                </Link>
            </div>
        )

    }

};

export default Greetings;