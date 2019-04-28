import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop }        from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../theme';

const IconElem = styled(FontAwesomeIcon)`
    font-size: ${theme.fontSizeIcon};
    color: ${theme.colorBasic};
    cursor: pointer;
`;

const Icon = ({type, onClick, className}) => (
    <IconElem 
        className={className}
        icon={type} 
        onClick={onClick}
    />
);

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};
Icon.defaultProps = {
    onClick: noop,
};

export default Icon;
