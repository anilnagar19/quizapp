import './App.css';
import React from 'react';
import 'fontsource-roboto';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import Dashoard from './screens/Dashoard';
import MainScreen from './screens/userSelectScreen';

function App() {
	return (
		<div className="App" >
			<Router>
				<Switch>
					<Route path="/" component={MainScreen} exact />

					<Route path="/user" component={Dashoard} />
					<Route path="/admin" component={Dashoard} />
				</Switch>
			</Router>
		</div >
	);
}

export default App;
