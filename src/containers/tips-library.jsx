import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'
import LibraryComponent from '../components/library/library.jsx'
import { closeTipsLibrary } from '../reducers/modals'

import exampleLibraryContent from '../lib/libraries/examples.json'
import exampleTags from '../lib/libraries/examples-tags'

class TipsLibrary extends React.PureComponent {
    constructor(props) {
        super(props)
        bindAll(this, ['handleItemSelect'])
        this.state = {
            examples: exampleLibraryContent
        }
    }
    handleItemSelect(item) {
        item.num = 0
        window.dispatchEvent(new CustomEvent('modal-save', { detail: item }))
    }
    render() {
        return (
            <LibraryComponent
                id='tipsLibrary'
                data={this.state.examples}
                tags={exampleTags}
                title='示例'
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onRequestClose: () => dispatch(closeTipsLibrary())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary)
