import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop, genId } from '../utils/utils';
import theme from '../theme';
import _ from 'lodash';
import InputBar from './InputBar';
import MessageItem from './MessageItem';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colorBorder};
`;
const MessageList = styled.div`
    flex: 1;
    overflow-y: scroll;
`;
const StyledMessageItem = styled(MessageItem)`
    margin: 5px 0;
`;
const StyledInputBar = styled(InputBar)`
    margin-top: 10px;
`;

class MessagePane extends React.Component {
    constructor (props) {
        super(props);
        this.messageList = React.createRef();

        this.state = {
            list: props.list || [],
        };
    }

    addToList (value) {
        const { list } = this.state;
        const obj = {
            id: genId(),
            userId: '',
            userName: 'Wenwu',
            time: Date.now(),
            text: value,
        };
        const newList = [
            ...list,
            obj,
        ];
        this.setState({
            list: newList,
        });
    }

    componentDidMount () {
        this.autoScroll();
    }
    componentDidUpdate () {
        this.autoScroll();
    }
    autoScroll = () => {
        const elem = this.messageList.current;
        // elem.scrollIntoView({behavior: 'smooth'});
        elem.scrollTop = elem.scrollHeight;
    }

    onInputEnter = (value) => {
        this.addToList(value);
    }

    render () {
        const { className } = this.props;
        const { list } = this.state;

        return (
            <Wrap className={className}>
                <MessageList ref={this.messageList}>
                    {
                        list.map((obj, idx) => {
                            const { id } = obj;
                            return <StyledMessageItem key={id} {...obj} />
                        })
                    }
                </MessageList>
                <StyledInputBar
                    placeholder="say something.."
                    btnText="Send"
                    onEnter={this.onInputEnter} 
                />
            </Wrap>
        );
    }
}

MessagePane.propTypes = {
};
MessagePane.defaultProps = {
};

export default MessagePane;
