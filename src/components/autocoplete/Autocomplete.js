import React, {Component} from "react";
import styles from './style.module.less';
import {Suggestions} from "./Suggestions";
import {Input} from "./Input";
import {NON_INDEX} from "../../consts";

export class ClickOutside extends Component {
    __elm = null;
    __isOutside = true;

    handleDocumentClick = (e) => {
        console.log(this.__isOutside);
        if (this.__isOutside) {
            this.props.handleClickOutside && this.props.handleClickOutside(e);
        }
        this.__isOutside = true;
    };

    componentDidMount () {
        window.addEventListener('click', this.handleDocumentClick)
        this.__elm.addEventListener('click', () => {
            this.__isOutside = false;
        })
    }

    componentWillUnmount () {
        window.removeEventListener('click', this.handleDocumentClick)
    }

    render() {
        return <div ref={elm => this.__elm = elm}>{this.props.children}</div>;
    }
}
export class Autocomplete extends Component {
    showCount = 10;
    state = {
        query: '',
        currentIndex: NON_INDEX,
        open: false,
        suggestions: []
    };

    handleClickOutside = (e) => {
        if (this.state.open) {
            this.setState({
                ...this.state,
                open: false
            });
        }
    };


    incrementCurrent = (up) => {
        let currentIndex = this.state.currentIndex;

        if (up) {
            if (currentIndex > NON_INDEX) {
                currentIndex -= 1;
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


    loadSuggestions(query, autoOpen = true) {
        this.props
            .loadData(query)
            .then((suggestions) => {
                this.setState({
                    ...this.state,
                    currentIndex: NON_INDEX,
                    suggestions: suggestions.slice(0, this.props.showCount || this.showCount),
                    open: autoOpen && suggestions.length > 0
                });
            });
    }

    componentDidMount () {
        this.loadSuggestions('', false);
    }


    setQuery = (query, andClose = false) => {
        this.setState({
            ...this.state,
            currentIndex: NON_INDEX,
            open: !andClose,
            query
        });
        
        if (!andClose) {
            this.loadSuggestions(query)
        }
    };

    openDropDown = () => {
        this.setState({
            ...this.state,
            open: this.state.suggestions.length > 0
        });
    };

    render() {
        let currentValue = this.state.query;
        if (this.state.currentIndex !== NON_INDEX) {
            currentValue = this.state.suggestions[this.state.currentIndex];
        }

        return (<div className={styles.root}>
            <ClickOutside handleClickOutside={this.handleClickOutside}>
                <Input
                    firstSuggestion = {this.state.suggestions[0]}
                    incrementCurrent={this.incrementCurrent}
                    onClick={this.openDropDown}
                    setQuery={this.setQuery}
                    query={this.state.query}
                    value={currentValue}
                />
                {this.state.open && this.state.suggestions.length > 0 &&
                    <Suggestions query={this.state.query} currentIndex={this.state.currentIndex} list={this.state.suggestions}/>
                }
            </ClickOutside>
        </div>);
    }
}