import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'

import { setBoard } from '../../reducers/akari'

class ItemBoard extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleClick'])
    }
    handleClick(v) {
        return () => {
            if (v === this.props.board) return
            this.props.setBoard(v)
            this.props.onRequestClose()
        }
    }
    render() {
        const { children, boards, board } = this.props
        return children(this.handleClick, boards, board)
    }
}

const mapStateToProps = state => ({
    boards: state.scratchGui.akari.boards,
    board: state.scratchGui.akari.board
})

const mapDispatchToProps = dispatch => ({
    setBoard: board => dispatch(setBoard(board))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemBoard)
