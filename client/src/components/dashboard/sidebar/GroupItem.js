import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedGroupId } from '../../../actions/groupActions';

const ItemWrapper = styled.div`
  width: 100%;
  height: 80px;
  background: gray;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const StyledGroupImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #000;
`;

const StyledGroupTextBox = styled.div`
  height: 75%;
  width: 82%;
  margin-left: 3%;
`;

const StyledGroupTitle = styled.h2`
  font-size: 1em;
  text-align: start;
`;

const StyledGroupMessage = styled.h4`
  font-size: 0.8em;
  text-align: start;
`;
class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object
  };
  render() {
    const { group } = this.props;
    return (
      <ItemWrapper onClick={e => this.props.setSelectedGroupId(group._id)}>
        <StyledGroupImage src="" />
        <StyledGroupTextBox>
          <StyledGroupTitle>{group.name}</StyledGroupTitle>
          <StyledGroupMessage>{group.lastMessage}</StyledGroupMessage>
        </StyledGroupTextBox>
      </ItemWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedGroupId: groupId => dispatch(setSelectedGroupId(groupId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GroupItem);
