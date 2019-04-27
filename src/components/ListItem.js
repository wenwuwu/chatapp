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
const InputWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`;
const Text = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 6px;
`;

class ListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isHovering: false,
        };
    }

    onEditClick = () => {
        const { onEdit } = this.props;
        onEdit();
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

    render () {
        const { className, id, text, input } = this.props;
        const { isHovering } = this.state;
        const InputElem = input ? <InputWrap> { input } </InputWrap> : null;

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
                { InputElem }
            </Wrap>
        );
    }
}

ListItem.propTypes = {
};
ListItem.defaultProps = {
};

export default ListItem;
