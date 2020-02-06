import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addMessageToGroup } from '../../../actions/groupActions';

const StyledMessageBoxWrapper = styled.div`
  width: 100%;
  height: 70px;
  background: #efefef;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 90%;
  margin: 10px;
  height: 40px;
`;

const StyledButton = styled(Button)`
  width: 10%;
  margin-right: 10px;
`;

class SendMessage extends React.PureComponent {
  constructor() {
    super();
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage(e) {
    const { group, addMessage } = this.props;
    addMessage(group._id, this.state.message);
  }

  state = {
    message: ''
  };

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.state);
    const { group } = this.props;
    if (Object.keys(group).length === 0) return <div />;
    return (
      <StyledMessageBoxWrapper>
        <StyledInput
          name="message"
          onChange={this.onHandleChange}
          value={this.state.message}
        />
        <StyledButton color="success" onClick={e => this.submitMessage(e)}>
          Send
        </StyledButton>
      </StyledMessageBoxWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (groupId, content) =>
      dispatch(addMessageToGroup(groupId, content))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SendMessage);
