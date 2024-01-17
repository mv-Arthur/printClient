import React from "react";
import classes from "./form.module.css";
import uploadImg from "../../images/uploadIco.svg";

export type FormDataType = {
	surname: string;
	name: string;
	groupNumber: string;
	file: any;
};

type FormPropsType = {
	formData: FormDataType;
	setFormData: (formData: FormDataType) => void;
};

type helperOptionType = "SURNAME" | "NAME" | "GROUP_NUMBER" | "FILE";

export const Form = ({ formData, setFormData }: FormPropsType) => {
	const inputFileRef = React.useRef<null | HTMLInputElement>(null);

	const getFormDataHelper = (option: helperOptionType, value: any) => {
		switch (option) {
			case "SURNAME": {
				setFormData({ ...formData, surname: value.trim() });
				break;
			}
			case "NAME": {
				setFormData({ ...formData, name: value.trim() });
				break;
			}
			case "GROUP_NUMBER": {
				setFormData({ ...formData, groupNumber: value.trim() });
				break;
			}

			case "FILE": {
				setFormData({ ...formData, file: value });
			}
		}
	};

	return (
		<>
			<form className={classes.form}>
				<div className={classes.wrapper}>
					<div className={classes.field}>
						<div className={classes.inputWrap}>
							<input
								type="text"
								className={classes.textInput}
								value={formData.surname}
								onChange={(e) => getFormDataHelper("SURNAME", e.currentTarget.value)}
							/>
						</div>
						<div className={classes.annotation}>
							<span>Фамилия</span>
						</div>
					</div>
					<div className={classes.field}>
						<span className={classes.annotation}>Имя</span>
						<div className={classes.inputWrap}>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => getFormDataHelper("NAME", e.currentTarget.value)}
								className={classes.textInput}
							/>
						</div>
					</div>
					<div className={classes.field}>
						<div className={classes.inputWrap}>
							<input
								type="text"
								className={classes.textInput}
								value={formData.groupNumber}
								onChange={(e) => getFormDataHelper("GROUP_NUMBER", e.currentTarget.value)}
							/>
						</div>
						<span className={classes.annotation}>Номер группы</span>
					</div>
					<div className={classes.field}>
						<span className={classes.annotation}>Загрузите файл</span>
						<button
							onClick={(e) => {
								e.preventDefault();
								if (inputFileRef.current) {
									inputFileRef.current.click();
								}
							}}
							className={classes.fileInput}
						>
							<img src={uploadImg} alt="upload" />
						</button>
					</div>
				</div>
			</form>
			<input
				ref={inputFileRef}
				type="file"
				hidden
				onChange={(e) => {
					if (e.currentTarget.files) {
						getFormDataHelper("FILE", e.currentTarget.files[0]);
					}
				}}
			/>
		</>
	);
};
