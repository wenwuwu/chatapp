import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindStyles } from 'styled-props2';
import style from './style';
import { noop } from '../../utils/utils';

const Wrap = styled.button`
    ${
        (props) => {
            const s = bindStyles(style);

            return css`
                display:         flex;
                justify-content: center;
                align-items:     center;
                cursor: pointer;
                outline: none;

                background: ${s.background};
                color:      ${s.color};

                border-style:  solid;
                border-width:  ${s.borderWidth};        
                border-color:  ${s.borderColor};
                border-radius: ${s.borderRadius};

                width:     ${s.width};
                height:    ${s.height};
                font-size: ${s.fontSize};

                &:hover {
                    background:   ${s.backgroundActive};
                    color:        ${s.colorActive};
                    border-color: ${s.backgroundActive};
                }
                &:active {
                    background:   ${s.backgroundActive};
                    color:        ${s.colorActive};
                    border-color: ${s.backgroundActive};
                }
            `;
        }
    };
`;

class Button extends React.Component {
    onClick = (e) => {
        const { greyed, onClick } = this.props;

        if (!greyed) {
            onClick(e);
        }
    }

    render () {
        const { children, className, onClick, ...others } = this.props;

        return (
            <Wrap className={className} onClick={this.onClick} {...others}>
                { children }
            </Wrap>
        );
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,

    primary: PropTypes.bool,
    primaryReverse: PropTypes.bool,
    greyed: PropTypes.bool,
    mini: PropTypes.bool,
    small: PropTypes.bool,
    full: PropTypes.bool,
};

Button.defaultProps = {
    onClick: noop,
    primary: null,
    primaryReverse: null,
    greyed: null,
    mini: null,
    small: null,
    full: null,
};

export default Button;
