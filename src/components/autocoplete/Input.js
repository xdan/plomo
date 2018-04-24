import React, {Component} from "react";
import styles from './style.module.less';
import {KEY_DOWN,KEY_UP} from "../../consts";

export class Input extends Component {
    onKeyDown = (e) => {
        if (e.which === KEY_UP || e.which === KEY_DOWN) {
            this.props.incrementCurrent(e.which === KEY_UP);
            e.preventDefault();
        }
    };
    onChange = (e) => {
        this.props.setQuery(e.target.value);
    };

    render() {
        let placeholder = '',
            {query, firstSuggestion} = this.props;

        let index = typeof firstSuggestion === 'string' && firstSuggestion.toLowerCase().indexOf(query.toLowerCase());

        if (index === 0 && query.length) {
            placeholder = query + firstSuggestion.substr(query.length);
        }

        if (!query.length) {
            placeholder = 'Type something...'
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
                defaultValue={query}
                tabIndex={0}
                type="text"
                autoFocus={true}
            />
        </div>
    }
}