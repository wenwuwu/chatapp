
import React from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import BackToCardList from '../components/BackToCardList'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
// import { Link, withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const CardView = ({id, name, deleteCard, router}) => (
    <div id="view-card-wrapper">
        <BackToCardList />

        <div className="section">
            <Card id={id} name={name} />

            <div className="row btns">
                <Link className="btn" to={`/cards/${id}/edit`}> Edit </Link>
                <button
                    className="btn" 
                    onClick={e => {
                        deleteCard(id)
                        router.push("/cards")
                }}> Delete
                </button>
            </div>
        </div>
    </div>
)

function mapStateToProps (state, ownProps) {
    const {cards} = state
    const idx = _.findIndex(cards, {id: ownProps.params.cardId})
    return cards[idx]
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(ActionCreators, dispatch)
)(withRouter(CardView))
