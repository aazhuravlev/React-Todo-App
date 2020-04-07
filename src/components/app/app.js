import React from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {
    constructor() {
        super();

        this.id = 0;

        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch')
            ],
            term: '',
            filterType: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleDone = this.onToggleDone.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onSeacrhChange = this.onSeacrhChange.bind(this);
    }

    createTodoItem(label) {
        return {
            label,
            done: false,
            important: false,
            id: this.id++
        }
    }

    deleteItem(id) {
        this.setState((state) => {
            return {
                todoData: state.todoData.filter(it => it.id !== id)
            }
        })
    }

    addItem(text) {
        this.setState((state) => {
            return {
                todoData: [...state.todoData, this.createTodoItem(text)]
            }
        })
    }

    onToggleImportant(index) {
        this.setState((state) => {
            return {
                todoData: this.toggleProperty(state.todoData, index, 'important')
            }
        })
    }

    onToggleDone(index) {
        this.setState((state) => {
            return {
                todoData: this.toggleProperty(state.todoData, index, 'done')
            }
        })
    }

    onSeacrhChange(term) {
        this.setState({ term })
    }

    toggleProperty(arr, id, propName) {
        const oldItem = arr[id];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, id),
            newItem,
            ...arr.slice(id + 1)
        ];
    }

    onFilterChange(filterType) {
        this.setState({ filterType })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter(el => el.label.toLowerCase().includes(term.toLowerCase()));
    }

    filter(items, filterType) {
        if (filterType === 'all') {
            return items
        }

        if (filterType === 'active') {
            return items.filter(el => !el.done)
        }

        if (filterType === 'done') {
            return items.filter(el => el.done)
        }
    }

    render() {
        const { todoData, term, filterType } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        const filteredTodoData = this.filter(this.search(todoData, term), filterType);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSeacrhChange={ this.onSeacrhChange }/>
                    <ItemStatusFilter
                        filter={filterType}
                        onFilterChange={ this.onFilterChange } />
                </div>
                <TodoList
                    todos={ filteredTodoData }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm
                    onItemAdded={ this.addItem }/>
            </div>
        )
    }
}