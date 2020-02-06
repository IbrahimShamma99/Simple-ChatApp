import React, { PureComponent } from 'react';
import styled from 'styled-components';

const GroupInfoWrapper = styled.div`
  width: 100%;
  height: 10%;
  background: #eeeeee;
`;

export default class GroupInfoBar extends PureComponent {
  render() {
    const { group } = this.props;
    if (Object.keys(group).length === 0) return <div />;
    return (
      <GroupInfoWrapper>
        <p>{group.name}</p>
      </GroupInfoWrapper>
    );
  }
}
