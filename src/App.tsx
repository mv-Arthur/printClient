import React from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/welcome/Welcome";
import { Waiting } from "./pages/waiting/Waiting";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/waiting/:id" element={<Waiting />} />
			</Routes>
		</div>
	);
}

export default App;
