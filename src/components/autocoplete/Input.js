import React, {Component} from "react";
import styles from './style.module.less';

export class Input extends Component {
    onChange = (e) => {
        this.props.setValue(e.target.value);
    };
    render() {
        const {value, placeholder} = this.props;

        return (<div className={styles.inputBox}>
            <input value={placeholder || value || 'Type something...'} className={styles.placeholder} type="text" tabIndex={-1} readOnly={true}/>
            <input onChange={this.onChange} defaultValue={value} tabIndex={0} type="text" autoFocus={true}/>
        </div>);
    }
}