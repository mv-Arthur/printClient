import React from "react";
import { Container } from "../../components/container/Container";
import { Header } from "../../components/header/Header";
import { Form, FormDataType } from "../../components/form/Form";
import classes from "./welcome.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
export const Welcome = () => {
	const [formData, setFormData] = React.useState<FormDataType>({
		surname: "",
		name: "",
		groupNumber: "",
		file: null,
	});
	const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);
	const navigate = useNavigate();

	const onClickHandler = async () => {
		try {
			const forServer = new FormData();
			forServer.append("name", formData.name);
			forServer.append("surname", formData.surname);
			forServer.append("groupNumber", formData.groupNumber);
			forServer.append("file", formData.file);
			const response = await axios.post("http://localhost:4000/user", forServer, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setSnackbar({ children: "Успех!", severity: "success" });
			setTimeout(() => {
				navigate(`/waiting/${response.data.id}`);
			}, 500);
		} catch (err: any) {
			setSnackbar({ children: `ошибка: ${err.response.data.message}`, severity: "error" });
		}
	};
	const handleCloseSnackbar = () => setSnackbar(null);
	return (
		<>
			<Container>
				<Header />
				<Form formData={formData} setFormData={setFormData} />
				<button className={classes.submit} onClick={onClickHandler}>
					отправить
				</button>
			</Container>
			{!!snackbar && (
				<Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSnackbar} autoHideDuration={6000}>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</>
	);
};
