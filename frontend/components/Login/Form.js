import axios from "axios";
import { Fragment, SyntheticBaseEvent } from "react";
import { useRouter } from "next/router";
import globalState from "../../states/GlobalState";

export default function LoginForm() {
	const router = useRouter();
	const updateLogon = globalState((state) => state.updateLogon);

	/**
	 * @param {SyntheticBaseEvent} event
	 */
	const login = async (submitEvent) => {
		submitEvent.preventDefault();
		const form = submitEvent.target;
		if (!form) return false;

		const data = { id: form?.id.value, password: form?.password.value };
		const response = await axios.post("/api/accounts/sign", data, {
			validateStatus: false,
		});
		const result = response.data;

		if (response.status == "200") {
			updateLogon(true);
			router.push("/");
		} else {
			console.log(result);
		}
		// TODO: login
	};

	return (
		<Fragment>
			<form onSubmit={login}>
				<input type="text" name="id"></input>
				<input type="password" name="password"></input>
				<input type="submit" value="로그인"></input>
			</form>
		</Fragment>
	);
}
