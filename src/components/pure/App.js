import Plomo from "./Plomo";
import {DataProvider} from "../../DataProvider";

export class PureApp {

    /**
     * @type Plomo
     */
    plomo;

    dataProvider = new DataProvider();

    constructor(root2) {
        this.plomo = new Plomo({
            loadData: this.dataProvider.loadData
        });
        root2.appendChild(this.plomo.container);
    }

    render() {
        this.plomo.render();
    }
}