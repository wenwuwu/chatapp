
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CardForm from '../components/CardForm'
import * as ActionCreators from '../actions'
import _ from 'lodash'

function mapStateToProps (state, ownProps) {
    const card = _.find(state.cards, {id: ownProps.cardId})
    return card ? card : {}
}
const CardFormWrapper = connect(
    mapStateToProps,
    dispatch => bindActionCreators(ActionCreators, dispatch)
)(CardForm)

export default CardFormWrapper
