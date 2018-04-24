import styles from '../plomo/style.module.less';
import {KEY_DOWN, KEY_ENTER, KEY_ESC, KEY_RIGHT, KEY_UP} from "../../consts";
import {WithProps} from "./WithProps";

export class Input extends WithProps{
    __possibleValue = null;

    oldValue = null;
    onChange = (e) => {
        switch (e.which) {
            case KEY_ESC:
                this.props.setQuery(null, true);
                e.preventDefault();
                break;
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

        if (this.oldValue !== e.target.value) {
            this.oldValue = e.target.value;
            this.props.setQuery(e.target.value);
        }
    };

    /**
     * @type HTMLInputElement
     */
    hint;

    /**
     * @type HTMLInputElement
     */
    input;

    constructor(props) {
        super(props);
        this.container = document.createElement('div');

        this.container.addEventListener('click', props.onClick)

        this.container.classList.add(styles.inputBox);

        this.hint = document.createElement('input');
        this.input = document.createElement('input');

        this.hint.setAttribute('type', 'text');
        this.hint.setAttribute('readOnly', 'true');
        this.hint.setAttribute('disabled', 'true');
        this.hint.setAttribute('tabIndex', '-1');
        this.hint.classList.add(styles.placeholder);

        this.input.setAttribute('type', 'text');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('autoFocus', 'true');

        this.input.addEventListener('keydown', (e) => {
            setTimeout(this.onChange, 1, e)
        });

        this.container.appendChild(this.hint);
        this.container.appendChild(this.input);
    }

    render(props) {
        this.updateProps(props);

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


        this.hint.value = placeholder;
        this.input.value = query === value ? query : value
    }
}