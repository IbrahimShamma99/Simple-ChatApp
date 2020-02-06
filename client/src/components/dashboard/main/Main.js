import React, { Component } from 'react'
import styled from 'styled-components';
import GroupInfoBar from './GroupInfoBar';
import SendMessage from './SendMessage';
import MessageList from './MessageList';
import {connect} from 'react-redux'

const StyledOuterDiv = styled.div`
    width:70%;
    height:100%;
    background-color: #f7f9fa;
    position:relative;
`

class Main extends Component {

    getSelectedGroup = (groups,selectedGroupId) => {
        let selectedGroup;
        selectedGroup = groups.find(function(group){
            return group._id === selectedGroupId
        });

        if(selectedGroup)
        return selectedGroup
        else
        return {}
    }

    render() {
        
        const {groups,selectedGroupId} = this.props.groups;
        console.log("Main",groups,selectedGroupId)
        const selectedGroup = this.getSelectedGroup(groups,selectedGroupId);
        return (
            <StyledOuterDiv>
                <GroupInfoBar group={selectedGroup} />
                <MessageList group={selectedGroup} />
                <SendMessage group={selectedGroup} />
            </StyledOuterDiv>
        )
    }
}

const mapStateToProps = state => {
    return {
        groups: state.groups
    }
}

export default connect(mapStateToProps,{})(Main);