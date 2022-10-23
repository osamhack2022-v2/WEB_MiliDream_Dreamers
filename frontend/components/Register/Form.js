import axios from "axios";
import { Fragment, SyntheticEvent } from "react";
import { useRouter, NextRouter } from "next/router";
export default function RegisterForm({ token }) {
	const router = useRouter();
	return (
		<Fragment>
			<form onSubmit={(e) => register(e, router)}>
				<input type="text" name="id"></input>
				<input type="password" name="password"></input>
				<input type="text" name="userName"></input>
				<select name="userClass">
					<option value="1">미정</option>
					<option value="2">병사</option>
					<option value="3">간부</option>
					<option value="4">군무원</option>
				</select>
				<input type="submit" value="회원가입"></input>
				<input type="hidden" name="token" value={token}></input>
			</form>
		</Fragment>
	);
}

/**
 * @param {SyntheticEvent<HTMLFormElement>} submitEvent
 * @param {NextRouter} router
 */
async function register(submitEvent, router) {
	submitEvent.preventDefault();
	const form = submitEvent.target;
	if (!form) return false;

	const data = {
		id: form?.id.value,
		password: form?.password.value,
		token: form?.token.value,
		userName: form?.userName.value,
		userClass: form?.userClass.value,
	};
	const response = await axios.post("/api/accounts/account", data, {
		validateStatus: false,
	});
	const result = response.data;
	if (result.success) {
		router.push("/login");
	} else {
		console.error(result);
	}
}
