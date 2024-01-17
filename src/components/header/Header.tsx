import React from "react";
import logo from "../../images/logo.svg";
import classes from "./header.module.css";
export const Header = () => {
	return (
		<div className={classes.header}>
			<img src={logo} alt="logo" />
			<h1>Print Helper :{")"}</h1>
		</div>
	);
};
