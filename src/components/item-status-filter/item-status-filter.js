import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
    constructor(prop) {
        super(prop);

        this.buttons = [
            {name: 'all', label: 'All'},
            {name: 'active', label: 'Active'},
            {name: 'done', label: 'Done'}
        ];
    }

    render() {
        const { filter, onFilterChange } = this.props;

        const buttons = this.buttons.map(it => {
            const isActive = filter === it.name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button type="button"
                        className={'btn ' + clazz}
                        key={it.name}
                        onClick={() => onFilterChange(it.name)}
                        >{it.label}</button>
            );
        });
        return (
            <div className="btn-group">
                { buttons }
            </div>
        );
    }
};
