import React, { ReactNode } from "react";
import classes from "./container.module.css";
const ContainerTemp = (props: { children: ReactNode }) => {
	return <div className={classes.container}>{props.children}</div>;
};
export const Container = React.memo(ContainerTemp);
