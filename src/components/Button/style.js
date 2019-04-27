
import theme from '../../theme';

/**
* Available options:
*
*     types: primary, primaryReverse, white, disabled
*     sizes: small, full
*/

const button = {
    background: {
        primary          : theme.colorPrimary1,
        primaryReverse   : 'transparent',
        white            : theme.white,
        disabled         : theme.grey1,
    },
    backgroundActive: {
        primary          : theme.colorPrimary2,
        primaryReverse   : theme.colorPrimary2,
        white            : theme.white,
        disabled         : theme.grey1,
    },
    borderColor: {
        primary          : 'transparent',
        primaryReverse   : theme.colorPrimary1,
        white            : 'transparent',
        disabled         : 'transparent',
    },
    borderWidth: {
        primary          : '0px',
        primaryReverse   : '1px',
        white            : '0px',
        disabled         : '0px',
    },
    color: {
        primary          : theme.white,
        primaryReverse   : theme.colorPrimary1,
        white            : theme.colorPrimary1,
        disabled         : theme.white,
    },
    colorActive: {
        primary          : theme.white,
        primaryReverse   : theme.white,
        white            : theme.colorPrimary1,
        disabled         : theme.white,
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
