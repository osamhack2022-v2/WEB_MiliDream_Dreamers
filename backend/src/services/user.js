import User from "../models/user";

export default class UserService {
	constructor() {
		// initialize something
	}

	/**
	 *
	 * @param {number | string} userId
	 * @returns {User?}
	 */
	getUserInfo(userId) {
		return User.getUserInfo(userId);
	}

	/**
	 *
	 * @param {number | string} userId
	 * @param {{new_password: string}} newInfo
	 * @returns
	 */
	putUserInfo(userId, newInfo) {
		return User.putUserInfo(userId, newInfo);
	}
}