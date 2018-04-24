import React, {Component} from "react";
import styles from './style.module.less';
import {KEY_DOWN, KEY_ENTER, KEY_RIGHT, KEY_UP} from "../../consts";

export class Input extends Component {
    __possibleValue = null;
    onKeyDown = (e) => {
        switch (e.which) {
            case KEY_RIGHT:
                if (e.target.selectionStart === e.target.value.length && this.__possibleValue !== null) {
                    this.props.setQuery(this.__possibleValue, true);
                    e.preventDefault();
                    break;
                }
                break;
            case KEY_ENTER:
                this.props.setQuery(e.target.value, true);
                e.preventDefault();
                break;
            case KEY_UP:
            case KEY_DOWN:
                this.props.incrementCurrent(e.which === KEY_UP);
                e.preventDefault();
                break;
        }
    };

    onChange = (e) => {
        this.props.setQuery(e.target.value);
    };

    render() {
        let placeholder = '',
            {query, firstSuggestion, value} = this.props;

        let index = typeof firstSuggestion === 'string' && firstSuggestion.toLowerCase().indexOf(query.toLowerCase());

        this.__possibleValue = null;
        if (index === 0 && query.length) {
            placeholder = query + firstSuggestion.substr(query.length);
            this.__possibleValue = firstSuggestion;
        }

        if (!query.length) {
            placeholder = 'Type something...'
        }

        if (query !== value) {
            placeholder = '';
        }

        return <div onClick={this.props.onClick} className={styles.inputBox}>
            <input
                value={placeholder}
                className={styles.placeholder}
                type="text"
                tabIndex={-1}
                readOnly={true}
                disabled={true}
            />
            <input
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                value={query === value ? query : value}
                tabIndex={0}
                type="text"
                autoFocus={true}
            />
        </div>
    }
}