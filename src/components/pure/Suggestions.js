import styles from './../plomo/style.module.less';
import {WithProps} from "./WithProps";

class Suggestion extends WithProps{
    onClick = (e) => {
        this.props.onSelect(this.props.value);
    };


    constructor(props) {
        super(props);

        this.container.classList.add(styles.suggetionsItem);

        this.container.addEventListener('click', this.onClick)
    }

    render() {
        let {value, query, current} = this.props;
        let index = value.toLowerCase().indexOf(query.toLowerCase());

        if (index !== -1 && query.length) {
            value = [
                `<span key={0}>${value.substr(0, index)}</span>`,
                `<strong key={1}>${value.substr(index, query.length)}</strong>`,
                `<span key={2}>${value.substr(index + query.length)}</span>`,
            ].join('');
        }

        if (current) {
            this.container.classList.add(styles.current);
        }

        this.container.innerHTML = value;
    }
}

export class Suggestions extends WithProps {

    onSelect = (value) => {
        this.props.setQuery(value, true);
    };

    constructor(props) {
        super(props);
        this.container.classList.add(styles.suggetions);
    }

    render(props) {
        this.updateProps(props);

        const {currentIndex} = this.props;

        const list = this.props.list.map((item, index) => {
            return new Suggestion({
                onSelect: this.onSelect,
                query: this.props.query,
                current: currentIndex === index,
                value: item
            });
        });

        this.container.innerHTML = '';

        list.forEach((item) => {
            item.render();
            this.container.appendChild(item.container);
        });

        this.container.scrollTop = 0;
    }
}
