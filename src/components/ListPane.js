import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop } from '../utils/utils';
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
            list: props.list,
            currentEditingIdx: -1,
            isAddingItem: props.isAddingItem,
        };
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            list: nextProps.list.slice(0),
            currentEditingIdx: nextProps.currentEditingIdx,
            isAddingItem: nextProps.isAddingItem,
        });
    }

    onClickButton = () => {
        const { onClickAdd } = this.props; 
        onClickAdd();
    }
    onInputEnter = (id, value) => {
        value = value.trim();
        if (value.length < 1) {
            return;
        }

        const { isAddingItem } = this.state;
        if (isAddingItem) {
            const { onNewItem } = this.props;
            onNewItem(value);
        }
        else {
            const { onItemUpdate } = this.props;
            onItemUpdate(id, value);
        }
    }
    onInputEsc = (id) => {
        const { onItemEditCancel } = this.props;
        onItemEditCancel(id);
    }
    onInputBlur = (id) => {
        const { onItemEditCancel } = this.props;
        setTimeout(() => onItemEditCancel(id), 0); // Make sure button is clickable.
    }
    onItemEdit = (id, value) => {
        const { onItemEdit } = this.props;
        onItemEdit(id);
    }
    onItemClick = (id) => {
        const { onItemClick } = this.props;
        onItemClick(id);
    }
    onItemRemove = (id) => {
        const { onDeleteItem } = this.props;
        onDeleteItem(id);
    }

    render () {
        const { className, btnName, activeIdx, defaultItemName } = this.props;
        let { list, currentEditingIdx, isAddingItem } = this.state;

        if (isAddingItem) {
            list = list.slice(0);
            list.push({id: `temp-${Date.now()}`, name: ''});
            currentEditingIdx = list.length - 1;
        }

        return (
            <Wrap className={className}>
                <ListWrap>
                    {
                        list.map((obj, idx) => {
                            const { id, name } = obj;
                            const inputElem = 
                                <InputBar
                                    useMiniBtn={true}
                                    value={name} 
                                    placeholder=""
                                    btnText="Add"
                                    autoSelect={name === defaultItemName}
                                    onBlur={this.onInputBlur.bind(this, id)} 
                                    onEnter={this.onInputEnter.bind(this, id)} 
                                    onEsc={this.onInputEsc.bind(this, id)} 
                                />;
                            const input = currentEditingIdx === idx ? inputElem : null;

                            return (
                                <ListItem 
                                    key={id} 
                                    id={id} 
                                    text={name} 
                                    input={input}
                                    isActive={activeIdx === idx}
                                    onEdit={this.onItemEdit.bind(this, id)}
                                    onRemove={this.onItemRemove.bind(this, id)}
                                    onClick={this.onItemClick.bind(this, id)}
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
    list: PropTypes.array,
    activeIdx: PropTypes.number,
    currentEditingIdx: PropTypes.number,
    defaultItemName: PropTypes.string,
    isAddingItem: PropTypes.bool,
    onItemClick: PropTypes.func,
    onClickAdd: PropTypes.func,
    onNewItem: PropTypes.func,
    onItemUpdate: PropTypes.func,
    onItemEditCancel: PropTypes.func,
    onItemEdit: PropTypes.func,
    onDeleteItem: PropTypes.func,
    btnName: PropTypes.string.isRequired,
};
ListPane.defaultProps = {
    list: [],
    activeIdx: -1,
    currentEditingIdx: -1,
    isAddingItem: false,
    defaultItemName: '',
    onItemClick: noop,
    onClickAdd: noop,
    onNewItem: noop,
    onItemUpdate: noop,
    onItemEditCancel: noop,
    onItemEdit: noop,
    onDeleteItem: noop,
};

export default ListPane;
