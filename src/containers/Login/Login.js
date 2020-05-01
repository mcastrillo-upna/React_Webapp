import React from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }

    state = {
        email: '',
        password: '',
        error: '',
    }

    componentDidMount() {
        this.inputElement.current.focus();
    }

    postLoginHandler = () => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        // console.log(authData);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYrgqYlN8p33gYNX1aH0j1iLsDkU6TBB4', authData)
            .then(response => {
                // console.log(response.data);
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
                // alert("hola");
                // window.location.replace("http://www.w3schools.com");
                // this.setState({
                //     submitted: true,
                // });
            })
            .catch(err => {
                this.setState({ error: err.response.data.error.message });
                // console.log(err);
                this.props.setAuthentication(false, {});
            });
    }

    postRegisterHandler = () => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        // console.log(authData);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYrgqYlN8p33gYNX1aH0j1iLsDkU6TBB4', authData)
            .then(response => {
                // console.log(response)
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
            })
            .catch(err => {
                this.setState({ error: err.response.data.error.message });
                // console.log(err);
                this.props.setAuthentication(false, {});
            });
    }

    render() {
        let error = '';
        if (this.state.error !== '') {
            error =
                <Form.Row>
                    <Form.Group className="error" as={Col} >
                        <Form.Label>Error: </Form.Label>
                        {this.state.error}
                    </Form.Group>
                </Form.Row>
        }

        let redirect = null;
        if (this.props.auth) {
            redirect = <Redirect to="/products" />;
        }
        return (

            <div className="Login">
                {redirect}
                <h3>Entra o regístrate</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Dirección email</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.email}
                            ref={this.inputElement}
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                        <Form.Text className="text-muted">
                            Nunca compartiremos tus datos con nadie más.
              </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                    </Form.Group>
                    <Button variant="info" onClick={this.postLoginHandler}>
                        Login
                    </Button>{' '}
                    <Button variant="info" onClick={this.postRegisterHandler}>
                        Registrar
                </Button>
                    {error}
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.bool,
    setAuthentication: PropTypes.func,
}

export default Login;