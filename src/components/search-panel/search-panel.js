import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {
    constructor(prop) {
        super(prop);

        this.state = {
            term: ''
        }

        this.onSeacrhChange = this.onSeacrhChange.bind(this);
    }
    onSeacrhChange(event) {
        const term = event.target.value;
        this.setState({ term });
        this.props.onSeacrhChange(term);
    }

    render() {
        return <input
                className="form-control search-input"
                type="text"
                placeholder="type to search"
                value={this.state.term}
                onChange={ this.onSeacrhChange } />
    }
};