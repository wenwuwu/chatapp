import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop }        from '../utils/utils';
import theme           from '../theme';
import Button          from './Button';

const Wrap = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    background: ${theme.background};
`;
const StyledInput = styled.input`
    flex: 1;
    height: 100%;
    border: 1px solid ${theme.colorBorder};
    color: ${theme.colorBasic};
    font-size: ${theme.fontSizeInput};
    padding: 0 5px;
    display: flex;
    align-items: center;
    outline: none;

    &::placeholder {
        color: ${theme.grey2};
        font-size: ${theme.fontSizeBasic};
    }
`;
const StyledButton = styled(Button)`
    margin-left: 5px;
`;

class InputBar extends React.Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();

        this.state = {
            value: props.value || '',
        };
    }
    componentDidMount () {
        this.checkFocus();
        if (this.props.autoSelect) {
            this.selectText();
        }
    }
    checkFocus () {
        this.input.current.focus();
    }
    selectText () {
        this.input.current.select();
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }
    focus = () => {
        this.input.current.focus();
    }
    onChange = (e) => {
        const value = e.target.value;
        this.setState({
            value,
        });
        const { onChange } = this.props;
        onChange(value);
    }
    onFocus = (e) => {
        const { onFocus } = this.props;
        onFocus(this.state.value);
    }
    onBlur = (e) => {
        const { onBlur } = this.props;
        onBlur(this.state.value);
    }
    onKeyDown = (e) => {
        const code = e.keyCode;
        const { onEsc, isBtnEnabled } = this.props;
        const { value } = this.state;

        if (code === 13) {      // Enter
            if (isBtnEnabled) {
                this.onEnter();
            }
        }
        else if (code === 27) {     // Esc
            onEsc(value);
        }
    }
    onEnter () {
        const { onEnter } = this.props;
        const { value } = this.state;
        this.clearValue();
        onEnter(value);
    }
    clearValue () {
        this.setState({
            value: '',
        });
    }
    onClickButton = () => {
        this.onEnter();
    }

    render () {
        const { className, placeholder, btnText, isBtnEnabled, useMiniBtn } = this.props;
        const { value } = this.state;

        const btnStyle = {};
        if (isBtnEnabled) {
            btnStyle.primary = true;
        }
        else {
            btnStyle.greyed = true;
        }
        if (useMiniBtn) {
            btnStyle.mini = true;
        }

        return (
            <Wrap className={className}>
                <StyledInput 
                    ref={this.input}
                    type="text" 
                    value={value} 
                    placeholder={placeholder} 
                    onKeyDown={this.onKeyDown} 
                    onChange={this.onChange} 
                    onFocus={this.onFocus} 
                    onBlur={this.onBlur} 
                />
                {
                    btnText
                     ?  <StyledButton onClick={this.onClickButton} {...btnStyle}> {btnText} </StyledButton>
                     : null
                }
            </Wrap>
        );
    }
}

InputBar.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    onEsc: PropTypes.func,
    autoSelect: PropTypes.bool,
    btnText: PropTypes.string,
    isBtnEnabled: PropTypes.bool,
    useMiniBtn: PropTypes.bool,
};
InputBar.defaultProps = {
    value: '',
    placeholder: '',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onEnter: noop,
    onEsc: noop,
    autoSelect: false,
    btnText: '',
    isBtnEnabled: true,
    useMiniBtn: false,
};

export default InputBar;
