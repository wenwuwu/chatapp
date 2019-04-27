import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { bindStyles } from 'styled-props2';
import style from './style';

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
    constructor (props) {
        super(props);
    }

    onClick = (e) => {
        const { disabled, onClick } = this.props;

        if (!disabled && onClick) {
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
};

/*
Button.defaultProps = {
    theme: {
    }
};
*/

export default Button;
