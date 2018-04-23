import React, {Component} from "react";
import styles from './style.module.less';

const Suggestion = (props) => (<div className={styles.suggetionsItem}>{props.children}</div>);
export class Suggestions extends Component {
    render() {
        const list = this.props.list.map((item, index) => {
            return <Suggestion key={index}>{item}</Suggestion>;
        });

        return (
            <div className={styles.suggetions}>
                {list}
            </div>
        );
    }
}
