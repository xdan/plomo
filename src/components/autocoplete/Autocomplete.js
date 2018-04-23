import React, {Component} from "react";
import styles from './style.module.less';
import {Suggestions} from "./Suggestions";
import {Input} from "./Input";

export class Autocomplete extends Component {
    state = {
        value: '',
        currentIndex: -1,
        open: false,
        suggestions: []
    };

    handleDocumentClick = (e) => {
        if (this.state.open) {
            this.setState({
                ...this.state,
                open: false
            });
        }
    };

    componentDidMount () {
        window.addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount () {
        window.removeEventListener('click', this.handleDocumentClick)
    }

    incrementCurrent = (up) => {
        let currentIndex = this.state.currentIndex;

        if (up) {
            if (currentIndex > 0) {
                currentIndex -= 1;
            } else {
                currentIndex = this.state.suggestions.length - 1;
            }
        } else {
            if (currentIndex < this.state.suggestions.length - 1) {
                currentIndex += 1;
            } else {
                currentIndex = 0;
            }
        }

        this.setState({
            ...this.state,
            open: true,
            currentIndex
        });
    };
    setValue = (value) => {
        this.setState({
            ...this.state,
            currentIndex: -1,
            value
        });

        this.props
            .loadData(value)
            .then((suggestions) => {
                this.setState({
                    ...this.state,
                    currentIndex: -1,
                    suggestions,
                    open: suggestions.length > 0
                });
            });
    };

    render() {
        return (<div className={styles.root}>
            <Input incrementCurrent={this.incrementCurrent} setValue={this.setValue} value={this.state.value}/>
            {this.state.open && this.state.suggestions.length > 0 &&
                <Suggestions currentIndex={this.state.currentIndex} list={this.state.suggestions}/>
            }
        </div>);
    }
}