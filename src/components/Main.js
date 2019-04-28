import React           from 'react';
import PropTypes       from 'prop-types';
import Icon            from './Icon';
import styled, { css } from 'styled-components';
import theme           from '../theme.js';
import Button          from './Button';
import ListPane        from './ListPane';
import MessagePane     from './MessagePane';
import io              from 'socket.io-client';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { newGroup as newGroupAction } from '../actions';
import * as ActionCreators from '../actions';

const center = `
    display: flex;
    justify-content: center;
    align-items: center;
`;
const vCenter = `
    display: flex;
    align-items: center;
`;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-bottom: 10px;
`;
const NavBar = styled.div`
    height: 60px;
    padding: 0 10px;
    ${center}
`;
const LogoWrap = styled.div`
    ${vCenter}
`;
const LogoIcon = styled(Icon)`
    font-size: ${theme.fontSizeH2};
    color: ${theme.colorPrimary1};
`;
const LogoText = styled.span`
    margin-left: 10px;
    font-size: ${theme.fontSizeH6};
    color: ${theme.colorBasic};
`;

const ContentWrap = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
`;
const GroupPane = styled(ListPane)`
    margin: 0 5px 0 10px;
    height: 100%;
    flex: 1;
`;
const StyledMessagePane = styled(MessagePane)`
    margin: 0 5px 0 5px;
    flex: 3;
    height: 100%;
`;
const UserPane = styled(ListPane)`
    margin: 0 10px 0 5px;
    height: 100%;
    flex: 1;
`;

class Main extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // const socket = io('http://localhost:8080');
        const socket = io();
        // socket.emit('new group', val);
        const { getUserInfo, getGroups } = this.props;
        getUserInfo();
        getGroups();

        socket.on('new group', (msg) => {
            const { newGroup } = this.props;
            newGroup(msg);
        });
        socket.on('edit group name', (msg) => {
            const { updateGroupName } = this.props;
            const { id, name } = msg;
            updateGroupName(id, name);
        });
        socket.on('delete group', (msg) => {
            const { deleteGroup } = this.props;
            const { id } = msg;
            deleteGroup(id);
        });
        socket.on('new user in group', (msg) => {
            const { newUserInGroup } = this.props;
            const { groupId, user } = msg;
            newUserInGroup(groupId, user);
        });
        socket.on('edit user name in group', (msg) => {
            const { editUserName } = this.props;
            const { groupId, user } = msg;
            editUserName(groupId, user);
        });
        socket.on('delete user from group', (msg) => {
            const { deleteUserFromGroup } = this.props;
            const { groupId, user } = msg;
            deleteUserFromGroup(groupId, user.id);
        });
    }

    onClickGroupItem = (id) => {
        const { selectGroup } = this.props;
        selectGroup(id);
    }
    onGroupItemNameUpdate = (id, name) => {
        const { postGroupName } = this.props;
        const reqBody = { id, name, };
        postGroupName(reqBody);
    }
    onUserItemNameUpdate = (id, name) => {
        const { postUserName, groups } = this.props;
        const { activeGroupId } = groups;
        const reqBody = { id: activeGroupId, userId: id, name, };
        postUserName(reqBody);
    }
    onGroupItemEditCancel = (id) => {
        const { removeGroupNameEditing, groups, doneWithAddingGroup } = this.props;
        const { isAddingGroup } = groups;
        if (isAddingGroup) {
            doneWithAddingGroup();
        }
        else {
            removeGroupNameEditing(id);
        }
    }
    onUserItemEditCancel = (id) => {
        const { removeUserNameEditing, groups, doneWithAddingUserInGroup } = this.props;
        const { isAddingUserInGroup } = groups;
        if (isAddingUserInGroup) {
            doneWithAddingUserInGroup();
        }
        else {
            removeUserNameEditing(id);
        }
    }
    onGroupItemEdit = (id) => {
        const { setGroupNameEditing } = this.props;
        setGroupNameEditing(id);
    }
    onUserItemEdit = (id) => {
        const { setUserNameEditing } = this.props;
        setUserNameEditing(id);
    }
    onDeleteGroup = (id) => {
        const { postDeleteGroup } = this.props;
        postDeleteGroup({id});
    }
    onDeleteUser = (id) => {
        const { postDeleteUserInGroup, groups } = this.props;
        const { activeGroupId } = groups;
        const reqBody = { id: activeGroupId, userId: id };
        postDeleteUserInGroup(reqBody);
    }

    onNewUser = (value) => {
        const { postNewUserInGroup, groups } = this.props;
        const { activeGroupId } = groups;
        const reqBody = { id: activeGroupId, name: value };
        postNewUserInGroup(reqBody);
    }

    onAddGroupClick = () => {
        const { setAddingGroup } = this.props;
        setAddingGroup();
    }
    onAddUserClick = () => {
        const { setAddingUserInGroup } = this.props;
        setAddingUserInGroup();
    }

    onNewGroup = (value) => {
        const { createNewGroup, user } = this.props;
        const group = {
            name: value,
            messages: [],
            users: [user],
        };
        createNewGroup(newGroupAction(group));
    }

    render () {
        console.log('-- Main.js props --');
        console.log(this.props);

        const { groups } = this.props;
        const { 
            list, 
            currentEditingGroupId, 
            currentEditingUserId, 
            activeGroupId, 
            isAddingGroup, 
            isAddingUserInGroup,
        } = groups;

        const activeGroupIdx = _.findIndex(list, {id: activeGroupId});
        const group = list[activeGroupIdx];
        const userList = group ? group.users : [];
        const currentEditingUserIdx = _.findIndex(userList, {id: currentEditingUserId});

        console.log('-- groupList --');
        console.log(list);
        console.log('-- userList --');
        console.log(userList);

        const groupList = list.map(obj => {
            return _.pick(obj, ['id', 'name']);
        });
        const currentEditingGroupIdx = _.findIndex(groupList, {id: currentEditingGroupId});


        return (
            <Wrap>
                <NavBar>
                    <LogoWrap>
                        <LogoIcon type="comments" />
                        <LogoText> Chat App </LogoText>
                    </LogoWrap>
                </NavBar>
                <ContentWrap>
                    <GroupPane 
                        list={groupList} 
                        activeIdx={activeGroupIdx}
                        currentEditingIdx={currentEditingGroupIdx}
                        btnName="Add Group"
                        onClickAdd={this.onAddGroupClick}
                        onNewItem={this.onNewGroup} 
                        onDeleteItem={this.onDeleteGroup} 
                        onItemUpdate={this.onGroupItemNameUpdate} 
                        onItemEditCancel={this.onGroupItemEditCancel}
                        onItemEdit={this.onGroupItemEdit}
                        onItemClick={this.onClickGroupItem} 
                        isAddingItem={isAddingGroup}
                    />
                    <StyledMessagePane />
                    <UserPane 
                        list={userList} 
                        currentEditingIdx={currentEditingUserIdx}
                        btnName="Add User" 
                        onClickAdd={this.onAddUserClick}
                        onNewItem={this.onNewUser} 
                        onDeleteItem={this.onDeleteUser} 
                        onItemUpdate={this.onUserItemNameUpdate} 
                        onItemEditCancel={this.onUserItemEditCancel}
                        onItemEdit={this.onUserItemEdit}
                        isAddingItem={isAddingUserInGroup}
                    />
                </ContentWrap>
            </Wrap>
        );
    }
};

Main.propTypes = {
};
Main.defaultProps = {
};

export default connect(
    (state, ownProps) => state,
    dispatch => bindActionCreators(ActionCreators, dispatch),
)(Main);
