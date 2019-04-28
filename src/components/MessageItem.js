import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop, formatTime } from '../utils/utils';
import theme from '../theme';
import _ from 'lodash';

const Wrap = styled.div`
    width: 100%;
    vertical-align: middle;
`;
const UserName = styled.span`
    font-weight: 500;
    color: ${theme.colorPrimary1};
    font-size: ${theme.fontSizeBasic};
`;
const Text = styled.span`
    padding-left: 5px;
    color: ${theme.colorBasic};
    font-size: ${theme.fontSizeBasic};
    line-height: 1.2;
    white-space: normal;
`;

const MessageItem = ({ className, userName, text }) => (
    <Wrap className={className}>
        <UserName> {userName + ':'} </UserName>
        <Text> {text} </Text>
    </Wrap>
);

MessageItem.propTypes = {
};
MessageItem.defaultProps = {
};

export default MessageItem;
