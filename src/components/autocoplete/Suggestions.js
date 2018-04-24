import React, {Component} from "react";
import styles from './style.module.less';

class Suggestion extends Component {
    onClick = (e) => {
        this.props.onSelect(this.props.value);
    };
    render(props) {
        let {value, query, current} = this.props;
        let index = value.toLowerCase().indexOf(query.toLowerCase());

        if (index !== -1 && query.length) {
            value = [
                <span key={0}>{value.substr(0, index)}</span>,
                <strong key={1}>{value.substr(index, query.length)}</strong>,
                <span key={2}>{value.substr(index + query.length)}</span>,
            ];
        }

        return <div onClick={this.onClick} className={styles.suggetionsItem + ' ' + (current ? styles.current : '')}>
            {value}
        </div>
    }
};

export class Suggestions extends Component {
    componentDidUpdate() {
        if (this.suggestion) {
            this.suggestion.scrollTop = 0;
        }
    }

    getSuggsettion = (sug) => {
        this.suggestion = sug;
    };
    onSelect = (value) => {
        this.props.setQuery(value, true);
    };
    render() {
        const {currentIndex} = this.props;

        const list = this.props.list.map((item, index) => {
            return <Suggestion
                onSelect={this.onSelect}
                query={this.props.query}
                current={currentIndex === index}
                key={index}
                value={item}
            />;
        });

        return (
            <div ref={this.getSuggsettion} className={styles.suggetions}>
                {list}
            </div>
        );
    }
}
