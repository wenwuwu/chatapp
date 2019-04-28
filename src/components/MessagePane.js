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
        value = value.trim();
        if (value.length < 1) {
            return;
        }
        const { onMessage } = this.props;
        onMessage(value);
    }
    render () {
        const { className, isBtnEnabled, list } = this.props;

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
                    isBtnEnabled={isBtnEnabled}
                />
            </Wrap>
        );
    }
}

MessagePane.propTypes = {
    isBtnEnabled: PropTypes.bool,
    list: PropTypes.array,
    onMessage: PropTypes.func,
};
MessagePane.defaultProps = {
    isBtnEnabled: true,
    list: [],
    onMessage: noop,
};

export default MessagePane;
