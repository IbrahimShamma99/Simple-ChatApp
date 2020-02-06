import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Modal} from 'reactstrap'
import {showCreateGroupModal, createGroup} from '../../../actions/groupActions'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components'

const StyledWrapper = styled.div`
    background-color: #F7F9FA;
    padding:10px;
    color: #4b5961;
`;

class CreateGroupModal extends Component {
    
    state = {

    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = () => {
        this.props.createGroup(this.state.group_name)
    }

    render() {
        const {group} = this.props;
        
        return (
            <Modal isOpen={group.isShowingCreateModal} toggle={() => this.props.showCreateGroupModal(!group.isShowingCreateModal)}>
               <StyledWrapper>
                <h2>Create Group</h2>
                <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Enter Group Name</Label>
                            <Input type="text" name="group_name" id="group_name" onChange={this.onChange} placeholder="Enter Group Name" />
                        </FormGroup>
                        
                    </Form>
                    <Button onClick={() => this.onSubmit()}>Submit</Button>
               </StyledWrapper>     
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        group : state.groups
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showCreateGroupModal : (isHowing) => dispatch(showCreateGroupModal(isHowing)),
        createGroup : (name) => dispatch(createGroup(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateGroupModal)