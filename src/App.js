import React, {Component} from "react";
import './app.less';
import Plomo from "./components/plomo/Plomo";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import {DataProvider} from "./DataProvider";

class App extends Component {
    dataProvider = new DataProvider();

    state = {
        gprs: true
    };

    toggleGPRS = () => {
        this.dataProvider.state.gprs = !this.dataProvider.state.gprs;
        this.setState({
            gprs: this.dataProvider.state.gprs
        });
    };

    render () {
        return (
            <React.Fragment>
                <Plomo loadData={this.dataProvider.loadData}/>
                <label>
                    <Toggle
                        checked={this.state.gprs}
                        onChange={this.toggleGPRS}
                    />
                    <span>GPRS</span>
                </label>
            </React.Fragment>
        );
    }
}

export default App;
