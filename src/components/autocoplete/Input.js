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
        this.props.setValue(e.target.value);
    };

    render() {
        const {value, placeholder} = this.props;

        return (<div className={styles.inputBox}>
            <input value={placeholder || value || 'Type something...'} className={styles.placeholder} type="text" tabIndex={-1} readOnly={true}/>
            <input onKeyDown={this.onKeyDown} onChange={this.onChange} defaultValue={value} tabIndex={0} type="text" autoFocus={true}/>
        </div>);
    }
}