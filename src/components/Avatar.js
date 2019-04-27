import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { bindStyles }  from 'styled-props';
import { pxToRem, flexBorderWidth } from 'styled-utils';
import { IconDiamond } from '../../icon';
import UnreadReminder  from '../unread-reminder';

const Wrap = styled.div`
    position: relative;
    display : inline-block;
    ${(props) => {
        const s = bindStyles(props.theme.ui.avatar);
        return css`
            width : ${pxToRem(s.width(props))};
            height: ${pxToRem(s.height(props))};
        `;
    }}
`;

const Img = styled.img`
    display      : inline-block;
    border-radius: 50%;
    ${(props) => {
        const s = bindStyles(props.theme.ui.avatar);
        return css`
            width : ${pxToRem(s.width(props))};
            height: ${pxToRem(s.height(props))};
            border: solid ${s.borderColor};
            ${flexBorderWidth(s.borderWidth(props))};
        `;
    }}
`;

const StyledDot = styled(UnreadReminder.Dot)`
    position : absolute;

    ${(props) => {
        const s = bindStyles(props.theme.ui.avatar.dot);
        return css`
            left : ${pxToRem(s.left(props))};
            bottom: ${pxToRem(s.bottom(props))};
        `;
    }}
`;

const VipWrap = styled.span`
    position       : absolute;
    display        : flex;
    justify-content: flex-start;
    align-items    : flex-start;
    padding        : 0;
    margin         : 0;
    ${(props) => {
        const s = bindStyles(props.theme.ui.avatar);
        return css`
            left : ${pxToRem(s.iconPad(props))};
            top: ${pxToRem(s.iconPad(props))};
        `;
    }}
`;

const defaultSrc = '//node-img.b0.upaiyun.com/component-mobile/ui/avatar/default.png';

const Avatar = props => (
    <Wrap>
        <Img src={props.src || defaultSrc} />

        { props.isNew && <StyledDot middle /> }

        {props.isVip &&
            <VipWrap>
                <IconDiamond />
            </VipWrap>
        }
    </Wrap>
);

Avatar.propTypes = {
    src: PropTypes.string,
    isVip: PropTypes.bool
};

Avatar.defaultProps = {
    src: defaultSrc,
    isVip: false
};

export default Avatar;
