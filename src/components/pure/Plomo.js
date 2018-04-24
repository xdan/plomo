import {CacheStack} from "../plomo/Plomo";
import styles from '../plomo/style.module.less';
import {NON_INDEX} from "../../consts";
import {Input} from "./Input";
import {Suggestions} from "./Suggestions";
import {WithProps} from "./WithProps";

class ClickOutside extends WithProps{
    __isOutside = true;

    handleDocumentClick = (e) => {
        if (this.__isOutside) {
            this.props.handleClickOutside && this.props.handleClickOutside(e);
        }
        this.__isOutside = true;
    };


    constructor (props) {
        super(props);

        window.addEventListener('click', this.handleDocumentClick)
        this.container.addEventListener('click', () => {
            this.__isOutside = false;
        })
    }
}

export default class extends WithProps {
    stack = new CacheStack();

    showCount = 10;

    state = {
        query: '',
        currentIndex: NON_INDEX,
        open: false,
        suggestions: []
    };

    /**
     * @type Suggestions
     */
    dropdownbox;

    /**
     * @type Input
     */
    input;


    constructor(props) {
        super(props);

        this.container.classList.add(styles.root);
        this.box = new ClickOutside({
            handleClickOutside: this.handleClickOutside
        });

        this.container.appendChild(this.box.container);

        this.input = new Input({
            firstSuggestion: this.state.suggestions[0],
            incrementCurrent: this.incrementCurrent,
            onClick: this.openDropDown,
            setQuery: this.setQuery,
            query: this.state.query,
            value: ''
        });

        this.box.container.appendChild(this.input.container)

        this.dropdownbox = new Suggestions({
            setQuery: this.setQuery,
            query: this.state.query,
            currentIndex: this.state.currentIndex,
            list: this.state.suggestions
        });

        this.loadSuggestions('', false);

        this.render();
    }

    setState(newstate){
        if (this.state !== newstate) {
            this.state = newstate;
            this.render();
        }
    }

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
                const items = suggestions.slice(0, this.props.showCount || this.showCount)
                this.stack.pushOrReplace(query, items);
                if (this.state.query === query) {
                    this.setState({
                        ...this.state,
                        currentIndex: NON_INDEX,
                        suggestions: items,
                        open: autoOpen && items.length > 0
                    });
                }
            });
    }


    setQuery = (query, andClose = false) => {
        if (query === null) {
            return this.setState({
                ...this.state,
                open: false
            });
        }

        let newState = {
            ...this.state,
            currentIndex: NON_INDEX,
            open: !andClose,
            query
        };

        let suggestions = this.stack.get(query);
        if (suggestions) {
            newState.suggestions = suggestions;
        }

        this.setState(newState);

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

        this.input.render({
            firstSuggestion: this.state.suggestions[0],
            query: this.state.query,
            value: currentValue
        });



        if (this.state.open && this.state.suggestions.length > 0) {
            this.dropdownbox.render({
                query: this.state.query,
                currentIndex: this.state.currentIndex,
                list: this.state.suggestions
            });
            this.box.container.appendChild(this.dropdownbox.container)
        } else {
            this.dropdownbox.container.parentNode && this.dropdownbox.container.parentNode.removeChild(this.dropdownbox.container)
        }
    }
}