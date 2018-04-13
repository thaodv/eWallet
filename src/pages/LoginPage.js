import React, { Component } from 'react';
import jwt from 'jsonwebtoken';

import { connect } from 'react-redux';
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

import Page from 'components/Page';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                loginEmail: "",
                loginPassword: ""
            }
        }
    }
    inputValidation(property, value) {
        let error = '';
        switch (property) {        
            case 'loginEmail':
                if (value === "") {
                    error = 'Please enter email address';
                }
                break;
            default:
                if (value === '' || value < 0) {
                    error = 'This field is Required';
                }
                break;
        }
        return error;
    }
    inputChange(e) {
        //e.preventDefault();
        let property = e.target.id;
        let value = e.target.value;
        let prev = this.state.form;        
        prev[property] = value;        
        this.setState({
            form: prev
        })
        let error = this.inputValidation(property, value);    
        document.getElementById('error_'+property).innerHTML = error;
    }
    fullFormValidation(e) {
        let checkFields = 0;
        let object = this.state.form;        
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                let error = this.inputValidation(key, object[key]);
                document.getElementById('error_' + key).innerHTML = error;
                if(error !== '') {
                    checkFields = 1;
                }          
            }
        }
        return checkFields;
    }
    onSubmit(e) {
        e.preventDefault();
        let checkFields = this.fullFormValidation();
        if(!checkFields) {
            if(this.state.form.loginEmail === "krishna@gmail.com" && this.state.form.loginPassword === "krishna@123") {
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
            }
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
