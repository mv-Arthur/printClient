import React from "react";
import { Container } from "../../components/container/Container";
import { Header } from "../../components/header/Header";
import classes from "./waiting.module.css";
import reload from "../../images/reload-ico.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

export type SerUserType = {
	createdAt: string;
	filePath: string;
	groupNumber: string;
	id: number;
	name: string;
	price: number;
	status: string;
	surname: string;
	updatedAt: string;
};

export const Waiting = () => {
	const param = useParams();
	const [status, setStatus] = React.useState<string>("");
	const [price, setPrice] = React.useState<number | null>(null);
	const [descr, setDescr] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				const data: SerUserType = (await axios.get(`http://localhost:4000/operator/${param.id}`)).data;
				setStatus(data.status);
				setPrice(data.price);
				printHelp();
			} catch (err) {
				console.log(err);
			}
		})();
	});

	const onReload = () => {
		(async () => {
			try {
				const data: SerUserType = (await axios.get(`http://localhost:4000/operator/${param.id}`)).data;
				setStatus(data.status);
				setPrice(data.price);
				printHelp();
			} catch (err) {
				console.log(err);
			}
		})();
	};

	const printHelp = () => {
		if (status === "ожидает принятия") {
			setDescr("Пожалуйста, подождите немного, пока оператор обработает ваш запрос, после чего обновите статус.");
		}
		if (status === "в работе") {
			setDescr("Ваш заказ принят в работу, пожалуйста, ожидайте и обновите статус чуть позже");
		}
		if (status === "выполнено") {
			setDescr("Ваш заказ готов, пожалуйста приготовьте наличные средства и пройдите в 314 кабинет");
		}
	};

	return (
		<Container>
			<Header />
			<p className={classes.typography}>{descr}</p>
			<div className={classes.statusBlock}>
				<span className={classes.status}>Статус: </span>
				<span className={classes.template}>{status}</span>
			</div>
			<div className={classes.statusBlock} style={{ marginTop: 15 }}>
				{!!price && (
					<>
						<span className={classes.status}>Цена: </span>
						<span className={classes.template}>{price} рублей</span>
					</>
				)}
			</div>

			<button onClick={onReload} className={classes.reload}>
				<span>обновить</span>
				<img src={reload} alt="" className={classes.reloadIco} />
			</button>
		</Container>
	);
};
