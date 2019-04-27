import React           from 'react';
import PropTypes       from 'prop-types';
import Icon            from './Icon';
import styled, { css } from 'styled-components';
import theme           from '../theme.js';
import Button          from './Button';
import ListPane        from './ListPane';

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
    width: 300px;
`;
const MessagePane = styled.div`
    margin: 0 5px 0 5px;
    flex: 1;
    height: 100%;
    border: 1px solid ${theme.colorBorder};
`;
const UserPane = styled(ListPane)`
    margin: 0 10px 0 5px;
    height: 100%;
    width: 300px;
`;

class Main extends React.Component {
    constructor (props) {
        super(props);
    }

    onGroupsChange = () => {
    }
    onUsersChange = () => {
    }

    render () {
        return (
            <Wrap>
                <NavBar>
                    <LogoWrap>
                        <LogoIcon type="comments" />
                        <LogoText> Chat App </LogoText>
                    </LogoWrap>
                </NavBar>
                <ContentWrap>
                    <GroupPane list={[]} btnName="Add Group" onChange={this.onGroupsChange} />
                    <MessagePane />
                    <UserPane list={[]} btnName="Add User" onChange={this.onUsersChange} />
                </ContentWrap>
            </Wrap>
        );
    }
};

Main.propTypes = {
};
Main.defaultProps = {
};

export default Main;
