import React, {Component} from "react";
import styles from './style.module.less';
import {KEY_DOWN, KEY_ENTER, KEY_UP} from "../../consts";

export class Input extends Component {
    onKeyDown = (e) => {
        switch (e.which) {
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

        if (index === 0 && query.length) {
            placeholder = query + firstSuggestion.substr(query.length);
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