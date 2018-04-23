import React, {Component} from "react";
import styles from './style.module.less';

const Suggestion = (props) => (<div className={styles.suggetionsItem}>{props.children}</div>);
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
        const list = this.props.list.map((item, index) => {
            return <Suggestion key={index}>{item}</Suggestion>;
        });

        return (
            <div ref={this.getSuggsettion} className={styles.suggetions}>
                {list}
            </div>
        );
    }
}
