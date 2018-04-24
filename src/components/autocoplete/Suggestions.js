import React, {Component} from "react";
import styles from './style.module.less';

const Suggestion = (props) => {
    let {value, query} = props;
    let index = value.toLowerCase().indexOf(query.toLowerCase());
    if (index !== -1 && query.length) {
        value = [
            <span key={0}>{value.substr(0, index)}</span>,
            <strong key={1}>{value.substr(index, query.length)}</strong>,
            <span key={2}>{value.substr(index + query.length)}</span>,
        ];
    }

    return <div className={styles.suggetionsItem + ' ' + (props.current ? styles.current : '')}>
        {value}
    </div>
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

    render() {
        const {currentIndex} = this.props;

        const list = this.props.list.map((item, index) => {
            return <Suggestion
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
