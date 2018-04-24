import React, {Component} from "react";
import styles from './app.less';
import {Autocomplete} from "./components/autocoplete/Autocomplete";
import FuzzySearch from 'fuzzy-search';

const Header = () => (<div className={styles.header}>
    <h1>Autocomplete JS Plugin</h1>
</div>);
const Footer = () => (<nav className={styles.footer}>
    <ul>
        <li><a href="https://github.com/xdan">Author</a></li>
        <li><a href="https://github.com/xdan/suggestions">Github</a></li>
    </ul>
</nav>);

const Demo = (props) => (<div className={styles.demo}>{props.children}</div>);

const data = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
];

class App extends Component {
    searcher;
    constructor() {
        super();
        this.searcher = new FuzzySearch(data, [], {
            caseSensitive: false,
        });
    }

    loadData = (value) => {
        return new Promise((resolve) => {
            // GPRS
            setTimeout(() => {
                const result = this.searcher.search(value);
                resolve(result);
            }, 500)
        });
    };

    render () {
        return (
            <div className={styles.box}>
                <Header/>
                <Demo>
                    <Autocomplete loadData={this.loadData}/>
                </Demo>
                <Footer/>
            </div>
        );
    }
}
export default App;
