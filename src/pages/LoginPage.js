import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../sessions/actions/UserActions';
import { setCookie } from '../functions';
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
        this.setCookie = setCookie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();
        let checkFields = this.fullFormValidation();
        if(!checkFields) {
            axios.post('/api/login', this.state.form)
                .then((res) => {
                    if(res.status === 200) {
                        this.setCookie('userToken',res.data.token,2)
                        .then((result) => {
                            if(result === 1) {
                                jwt.verify(res.data.token, 'ewallet', function(err, data) {
                                    if(!err) {
                                      this.props.loginUser({
                                        name: "krishna",
                                        email: data.email,
                                        id: 1
                                      })  
                                      this.props.history.push('/home');                              
                                    } else {
                                      console.log(err);
                                    }                            
                                }.bind(this));
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });                      
                    } else {
                        console.log(res.message);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });            
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
const mapDispatchToProps = (dispatch,props) => {
    return bindActionCreators({
        loginUser
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
