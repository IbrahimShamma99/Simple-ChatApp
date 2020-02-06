import React, { Component } from 'react'
import GroupItem from './GroupItem';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups } from '../../../actions/groupActions';
import styled from 'styled-components';

const GroupWrapper = styled.div`
    height:80%;
    width:100%;
    overflow-y: scroll;
`;


class Groups extends Component {
    componentDidMount() {
        console.log("Props",this.props);
        this.props.fetchGroups();
    }
    render() {
        const {groupsReducer} = this.props
        const groups = groupsReducer.groups;
        if(groups.length === 0) return <GroupWrapper />
        return (
            <GroupWrapper>
                {groups.map(group => {
                    return <GroupItem key={group._id} group={group}  />
                })}
            </GroupWrapper>
        )
    }
}
const mapStateToProps = (state) => ({
    groupsReducer: state.groups
})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchGroups: fetchGroups},dispatch)
}   

export default connect(mapStateToProps,mapDispatchToProps)(Groups);