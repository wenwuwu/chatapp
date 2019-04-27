import React           from 'react';
import PropTypes       from 'prop-types';
import styled, { css } from 'styled-components';
import { noop, genId } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import theme from '../theme';
import ListItem from './ListItem';
import _ from 'lodash';

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
        const { onChange } = this.props;
        const obj = {
            id: genId(''),
            text: '',
        };
        const newList = [...list, obj];
        this.setState({
            list: newList,
            currentEditingIdx: list.length,
        });
        onChange(newList);
    }

    onItemEdit = (id, value) => {
        const { list } = this.state;
        const { onChange } = this.props;
        const idx = _.findIndex(list, {id: id});
        const obj = _.cloneDeep(list[idx]);
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
        const { className, btnName } = this.props;
        const { list, currentEditingIdx } = this.state;

        return (
            <Wrap className={className}>
                <ListWrap>
                    {
                        list.map((obj, idx) => {
                            const { id, text } = obj;

                            return (
                                <ListItem 
                                    key={id} 
                                    id={id} 
                                    text={text} 
                                    isEditing={currentEditingIdx === idx}
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
