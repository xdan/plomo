export class WithProps {
    props = {};

    updateProps(props) {
        this.props = {...this.props, ...props}
    }

    /**
     * @type HTMLDivElement
     */
    container;

    constructor(props) {
        this.updateProps(props);
        this.container = document.createElement('div');
    }
}