
import theme from '../../theme';

/**
* Available options:
*
*     types: primary, primaryReverse
*     sizes: small, full
*/

const button = {
    background: {
        primary          : theme.colorPrimary1,
        primaryReverse   : 'transparent',
    },
    backgroundActive: {
        primary          : theme.colorPrimary2,
        primaryReverse   : theme.colorPrimary2,
    },
    borderColor: {
        primary          : 'transparent',
        primaryReverse   : theme.colorPrimary1,
    },
    borderWidth: {
        primary          : '0px',
        primaryReverse   : '1px',
    },
    color: {
        primary          : theme.white,
        primaryReverse   : theme.colorPrimary1,
    },
    colorActive: {
        primary          : theme.white,
        primaryReverse   : theme.white,
    },

    fontSize: {
        default: theme.fontSizeButton,
    },
    borderRadius: {
        default: theme.borderRadius,
    },
    width: {
        small : '120px',
        full  : '100%',
    },
    height: {
        default: '30px',
    },
};

export default button;
