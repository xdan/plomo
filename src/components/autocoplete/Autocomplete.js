import React, {Component} from "react";
import styles from './style.module.less';
import {Suggestions} from "./Suggestions";
import {Input} from "./Input";

export class Autocomplete extends Component {
    state = {
        value: '',
        suggestions: []
    };

    setValue = (value) => {
        this.setState({
            ...this.state,
            value
        });

        this.props
            .loadData(value)
            .then((suggestions) => {
                this.setState({
                    ...this.state,
                    suggestions
                });
            });
    };

    render() {
        return (<div className={styles.root}>
            <Input setValue={this.setValue} value={this.state.value}/>
            {this.state.suggestions.length ?
                <Suggestions list={this.state.suggestions}/> : null
            }
        </div>);
    }
}