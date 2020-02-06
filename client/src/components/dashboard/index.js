import React, { Component } from 'react'
import Sidebar from './sidebar';
import Main from './main';
import {LoginSignupModal,CreateGroupModal} from './modals'
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background: gray;
`;

export default class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Sidebar />
                <Main />
                <LoginSignupModal />
                <CreateGroupModal />
            </Wrapper>
        )
    }
}
