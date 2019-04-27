import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop } from '../utils/utils';
import Icon from './Icon';
import theme from '../theme';

const Wrap = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;
const IconWrap = styled.div`
`;
const StyledIcon = styled(Icon)`
    margin: 0 5px;
`;
const StyledInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.colorBorder};
    color: ${theme.colorBasic};
    font-size: ${theme.fontSizeInput};
    padding: 0 5px;
    z-index: 10;
    display: flex;
    align-items: center;
    outline: none;
`;
const Text = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
`;

class ListItem extends React.Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();

        this.state = {
            isHovering: false,
            isEditing: props.isEditing || false,
            value: props.text || '',
        };
    }

    componentDidMount () {
        this.checkInputFocus();
    }
    componentDidUpdate () {
        this.checkInputFocus();
    }
    checkInputFocus () {
        if (this.state.isEditing) {
            this.input.current.focus();
        }
    }

    componentWillReceiveProps (nextProps) {
        const { text } = nextProps;
        if (text !== this.state.value) {
            this.setState({
                value: text,
            });
        }
    }

    onEditClick = () => {
        this.setState({
            isEditing: true,
        });
    }
    onRemoveClick = () => {
        const { onRemove } = this.props;
        onRemove();
    }
    onMouseEnter = () => {
        this.setState({
            isHovering: true,
        });
    }
    onMouseLeave = () => {
        this.setState({
            isHovering: false,
        });
    }

    onValueChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    onInputKeyDown = (e) => {
        const code = e.keyCode;
        const { text, onEdit } = this.props;
        const { value } = this.state;

        if (code === 13) {  // Enter
            this.setState({
                isEditing: false,
            });
            if (value !== text) {
                onEdit(value);
            }
        }
        else if (code === 27) {     // Esc
            this.setState({
                isEditing: false,
                value: text,
            });
        }
    }

    render () {
        const { className, id, text } = this.props;
        const { isHovering, isEditing, value } = this.state;

        return (
            <Wrap 
                className={className} 
                onMouseEnter={this.onMouseEnter} 
                onMouseLeave={this.onMouseLeave}
            >
                <Text> {text} </Text>
                {
                    isHovering ? 
                    <IconWrap>
                        <StyledIcon type="pen" onClick={this.onEditClick} />
                        <StyledIcon type="times" onClick={this.onRemoveClick} />
                    </IconWrap>
                    : null
                }
                {
                    isEditing 
                    ? <StyledInput 
                          ref={this.input}
                          type="text" 
                          value={value} 
                          onKeyDown={this.onInputKeyDown} 
                          onChange={this.onValueChange} 
                      />
                    : null
                }
            </Wrap>
        );
    }
}

ListItem.propTypes = {
};
ListItem.defaultProps = {
};

export default ListItem;
