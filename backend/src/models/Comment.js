import mariadb from "../loaders/mariadb.js";

async function getCommentbyCommentKey(commentKey) {
	const sql = `SELECT commentKey, userKey, body, commentTime FROM Comment WHERE commentKey=?`;
	const result = mariadb.query(sql, [commentKey]);
	return result[0];
}

export default class Comment {
	static async postComment(userKey, { postKey, body, parentKey }) {
		if (!userKey || !postKey || !body) {
			throw Error(
				`입력값이 충분하지 않음, userKey="${userKey}", postKey="${postKey}", body="${body}"`
			);
		}
		const sql = `INSERT INTO Comment(userKey, body, postKey, parentKey) VALUES (?, ?, ?, ?);`;
		const result = await mariadb.query(sql, [
			userKey,
			body,
			postKey,
			parentKey ?? null,
		]);

		if (result.affectedRows === 0) {
			throw Error(`댓글을 입력할 수 없음`);
		}

		return getCommentbyCommentKey(Number(result.insertId));
	}
	static async updateCommentbycommentId(commentKey, userKey, { body }) {
		const sql = `UPDATE Comment SET body=? WHERE commentKey=? AND userKey=?;`;
		const result = await mariadb.query(sql, [body, commentKey, userKey]);
		if (result.affectedRows === 0) {
			throw Error(
				`commentKey="${commentKey}"인 댓글 업데이트 할 수 없음`
			);
		}

		return;
	}
	static async deleteCommentbycommentId(commentKey, userKey) {
		const sql = `DELETE FROM Comment WHERE commentKey=? AND userKey = ?;`;
		const result = await mariadb.query(sql, [commentKey, userKey]);
		if (result.affectedRows === 0) {
			throw Error(`commentKey="${commentKey}"에 해당하는 댓글 없음`);
		}

		return;
	}
}
