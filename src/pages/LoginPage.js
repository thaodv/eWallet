import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../sessions/actions/UserActions';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { inputChange, fullFormValidation } from '../functions';
import Page from 'components/Page';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                loginEmail: "",
                loginPassword: ""
            }
        }
        this.inputChange = inputChange.bind(this);
        this.fullFormValidation = fullFormValidation.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        let checkFields = this.fullFormValidation();
        if(!checkFields) {
            axios.post('/api/login', this.state.form)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                /* if(this.state.form.loginEmail === "krishna@gmail.com" && this.state.form.loginPassword === "krishna@123") {
                    console.log(this.state.form);
                    this.props.loginUser({
                        name: "krishna",
                        email: this.state.form.loginEmail,
                        id: 1
                    })
                    jwt.sign({
                        name: "krishna",
                        email: this.state.form.loginEmail,
                        id: 1
                    }, "ewallet", { }, function(err, token) {
                        console.log(token);
                        localStorage.setItem("userToken",token);
                        this.props.history.push("/home");
                    }.bind(this));
                } else {
                    alert("Please enter correct details");
                } */
        } else {
            alert('Please fill all the fields');
        }   
        //alert(process.env.LOGIN_PASSWORD);
    }
    render() {
        return (
            <Page /* title="Forms" breadcrumbs={[{ name: 'Forms', active: true }]} */>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardHeader>Login</CardHeader>
                            <CardBody>
                                <div className="row justify-content-center">
                                    <div className="col-10 col-sm-7 col-md-5 col-lg-4">
                                    <Form>
                                        <FormGroup>
                                        <Label for="loginEmail">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="loginEmail"
                                            placeholder="youremail@yourhost.com"
                                            onChange={(e) => this.inputChange(e)}
                                            onBlur={(e) => this.inputChange(e)}
                                        />
                                        <span id="error_loginEmail"></span>
                                        </FormGroup>
                                        <FormGroup>
                                        <Label for="loginPassword">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="loginPassword"
                                            placeholder="your password"
                                            onChange={(e) => this.inputChange(e)}
                                            onBlur={(e) => this.inputChange(e)}
                                        />
                                        <span id="error_loginPassword"></span>
                                        </FormGroup>
                                        <Button type="submit" onClick={ (e)=>this.onSubmit(e) } >Log In</Button>
                                    </Form>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>                
            </Page>
        );
    }
};
const mapStateToProps = (store) => {
    return({
        user: store.user
    });
}
const mapDispatchToProps = dispatch => {
    return {
      loginUser : (data) => dispatch(loginUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
