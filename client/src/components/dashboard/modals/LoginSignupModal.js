import React, { Component } from 'react'
import {Modal} from 'reactstrap'
import {connect} from 'react-redux'
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {loginUser,showLoginSignupModal} from '../../../actions/authActions'
const StyledWrapper = styled.div`
    background-color: #F7F9FA;
    padding:10px;
    color: #4b5961;
`;

const StyledLinkContainer = styled.div`
    display:flex;
    flex-direction: row;
`;
const StyledText = styled.h6`
    margin:0;
    font-size: 15px;
`

const StyledSignUpButton = styled.button`
    background: transparent;
    color: #0AD261;
    border:none;
    font-size: 12px;
    font-style: bold;
`;

class LoginSignupModal extends Component {

    onSignInClick = () => {
        const email = this.state.email;
        const password = this.state.password;
        const userData = {
            email,
            password
        }
        this.props.login(userData);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    state = {
        email:'',
        password:'',
        error: ''
    }

    render() {
        const showModal = this.props.auth.isShowingLoginSignupModal;
        return (
            <Modal isOpen={showModal} toggle={() => this.props.showLoginSignupModal(false)} >
               <StyledWrapper>
                <h2>Sign in</h2>
                <StyledLinkContainer>
                <StyledText>Don't have an account ?</StyledText><StyledSignUpButton>Sign Up</StyledSignUpButton>
                </StyledLinkContainer>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" onChange={this.onChange} placeholder="Enter Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" onChange={this.onChange} placeholder="Enter Password" />
                        </FormGroup>
                    </Form>
                    <Button onClick={() => this.onSignInClick()}>Sign In</Button>
                </StyledWrapper> 
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login : (userData) => dispatch(loginUser(userData)) ,
        showLoginSignupModal: (isShowing) => dispatch(showLoginSignupModal(isShowing))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupModal);