import React, { Component } from 'react'
import styled from 'styled-components'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {showLoginSignupModal,logoutUser} from '../../../actions/authActions'
import {showCreateGroupModal} from '../../../actions/groupActions'
const StyledWrapper = styled.div`
    width: 100%;
    height:10%;
    background: #EEEEEE;
    border-right: 1px solid #ccc;
    padding:10px;
    display:flex;
    align-items:center;
`


class ActionBar extends Component {
    render() {
        console.log('ActionBar Props',this.props);
        const { isAuthenticated } = this.props.auth;
        let authButton;
        if(isAuthenticated) {
           authButton = (
           <React.Fragment>
            <Button onClick={() => this.props.logoutUser(true)}>Sign Out</Button>
            <Button onClick={() => this.props.showCreateGroupModal(true)}>Create Group</Button>
           </React.Fragment>    
           )
        } else {
           authButton = <Button onClick={() => this.props.showLoginSignupModal(true)}>Sign In</Button>
        }
        return (
            <StyledWrapper>
                {authButton}
            </StyledWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoginSignupModal: (isShowing) => dispatch(showLoginSignupModal(isShowing)),
        showCreateGroupModal: (isShowing) => dispatch(showCreateGroupModal(isShowing)),
        logoutUser: () => dispatch(logoutUser())
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ActionBar)
