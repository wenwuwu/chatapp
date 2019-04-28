
import theme from '../../theme';

/**
* Available options:
*
*     types: primary, primaryReverse, greyed
*     sizes: small, full
*/

const button = {
    background: {
        primary          : theme.colorPrimary1,
        primaryReverse   : 'transparent',
        greyed           : theme.grey1,
    },
    backgroundActive: {
        primary          : theme.colorPrimary2,
        primaryReverse   : theme.colorPrimary2,
        greyed           : theme.grey1,
    },
    borderColor: {
        primary          : 'transparent',
        primaryReverse   : theme.colorPrimary1,
        greyed           : 'transparent',
    },
    borderWidth: {
        primary          : '0px',
        primaryReverse   : '1px',
        greyed           : '0px',
    },
    color: {
        primary          : theme.white,
        primaryReverse   : theme.colorPrimary1,
        greyed           : theme.white,
    },
    colorActive: {
        primary          : theme.white,
        primaryReverse   : theme.white,
        greyed           : theme.white,
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
        mini  : '80px',
    },
    height: {
        default: '30px',
    },
};

export default button;
