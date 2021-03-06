import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {
    constructor(prop) {
        super(prop);

        this.state= {
            label: ''
        }

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onLabelChange(event) {
        this.setState({
            label: event.target.value
        });
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onItemAdded(this.state.label)
        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="What needs to be done"
                       value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                        Add Item
                </button>
            </form>
        )
    }
}