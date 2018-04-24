# Suggestions React

```bash
npm i plomo --save
```

```jsx
import React, {Component} from "react";
import Plomo from "plomo/src/components/plomo/Plomo";
class App extends Component {
	/**
	 * Must return Promise<string[]>
	 */
	loadData = () => {
		return new Promise(...);
	}
	render() {
		return <Plomo loadData={this.loadData}/>
	}
}
```


