import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop, genId } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import theme from '../theme';
import ListItem from './ListItem';
import _ from 'lodash';
import InputBar from './InputBar';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colorBorder};
`;
const ButtonWrap = styled(Button)`
    margin-top: 10px;
`;
const ListWrap = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

class ListPane extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            list: props.list || [],
            currentEditingIdx: -1,
        };
    }

    onClickButton = () => {
        const { list } = this.state;
        const { onChange, defaultItemName } = this.props;
        const obj = {
            id: genId(''),
            text: defaultItemName || '',
        };
        const newList = [...list, obj];
        this.setState({
            list: newList,
            currentEditingIdx: list.length,
        });
        onChange(newList);
    }
    onInputEnter = (id, value) => {
        const { list } = this.state;
        const { onChange } = this.props;
        const idx = _.findIndex(list, {id: id});
        const old = list[idx];

        this.hideInput();
        if (old.text === value) {
            return;
        }
        const obj = _.cloneDeep(old);
        obj.text = value;

        const newList = [
            ...list.slice(0, idx),
            obj,
            ...list.slice(idx + 1),
        ];
        this.setState({
            list: newList,
        });
        onChange(newList);
    }
    onInputEsc = (id, value) => {
        this.hideInput();
    }
    onInputBlur = (id, value) => {
        setTimeout(this.hideInput, 0);  // Make sure button is clickable.
    }
    hideInput = () => {
        this.setState({
            currentEditingIdx: -1,
        });
    }
    onItemEdit = (id, value) => {
        const { list } = this.state;
        const idx = _.findIndex(list, {id: id});
        this.setState({
            currentEditingIdx: idx,
        });
    }
    onItemRemove = (id) => {
        const { list } = this.state;
        const { onChange } = this.props;
        const idx = _.findIndex(list, {id: id});

        const newList = [
            ...list.slice(0, idx),
            ...list.slice(idx + 1),
        ];
        this.setState({
            list: newList,
        });
        onChange(newList);
    }

    render () {
        const { className, btnName, defaultItemName } = this.props;
        const { list, currentEditingIdx } = this.state;

        return (
            <Wrap className={className}>
                <ListWrap>
                    {
                        list.map((obj, idx) => {
                            const { id, text } = obj;
                            const inputElem = 
                                <InputBar
                                    value={text} 
                                    placeholder=""
                                    btnText="Add"
                                    autoSelect={text === defaultItemName}
                                    onBlur={this.onInputBlur.bind(this, id)} 
                                    onEnter={this.onInputEnter.bind(this, id)} 
                                    onEsc={this.onInputEsc.bind(this, id)} 
                                />;
                            const input = currentEditingIdx === idx ? inputElem : null;

                            return (
                                <ListItem 
                                    key={id} 
                                    id={id} 
                                    text={text} 
                                    input={input}
                                    onEdit={this.onItemEdit.bind(this, id)}
                                    onRemove={this.onItemRemove.bind(this, id)}
                                />
                            );
                        })
                    }
                </ListWrap>
                <ButtonWrap primaryReverse full onClick={this.onClickButton}>
                    {btnName}
                </ButtonWrap>
            </Wrap>
        );
    }
}

ListPane.propTypes = {
};
ListPane.defaultProps = {
};

export default ListPane;
