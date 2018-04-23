import React from "react";
import styles from './app.less';
import {Autocomplete} from "./components/autocoplete/Autocomplete";


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

const App = () => {
    return (
        <div className={styles.box}>
            <Header/>
            <Demo>
                <Autocomplete/>
            </Demo>
            <Footer/>
        </div>
    );
};
export default App;
