# Suggestions React

```bash
npm i plomo --save
```

```js
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
 	return <Plomo showCount={20} loadData={this.loadData}/>
 }
}
```

or pure js

```js
import Plomo from "plomo/src/components/pure/Plomo";
var plomo = new Plomo({
	loadData: this.dataProvider.loadData
});
document.body.appendChild(plomo.container);
```


