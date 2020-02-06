import React, { Component } from 'react'
import styled from 'styled-components';
import GroupList from './GroupList';
import ActionBar from './ActionBar';
import {InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
const StyledOuterDiv = styled.div`
    width:30%;
    height:100%;
    background-color: black;
`;



const SearchBar = styled.div`
    width: 100%;
    height: 10%;
    background: #f8f8f8;
    border: 0.1px solid #f9efef;
    display: flex;
    align-items: center;
    padding: 10px;
`

export default class Sidebar extends Component {
    render() {
        return (
            <StyledOuterDiv>
                  <ActionBar />  
                  <SearchBar>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend"><button className="fa fa-search" ></button></InputGroupAddon>
                        <Input placeholder="Search" />
                        
                      </InputGroup>  
                  </SearchBar>    
                  <GroupList />
            </StyledOuterDiv>
        )
    }
}
