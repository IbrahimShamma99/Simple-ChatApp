import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledMessagesBox = styled.div`
  width: 100%;
  height: 80%;
  background-color: grey;
  overflow: scroll;
`;

export default class MessageList extends PureComponent {
  render() {
    const { group } = this.props;
    if (Object.keys(group).length === 0) return <div />;

    const { messages } = group;
    console.log('Messages', messages);
    return (
      <StyledMessagesBox>
        {messages.map(message => {
          return <p key={message._id}>{message.message.content}</p>;
        })}
      </StyledMessagesBox>
    );
  }
}
