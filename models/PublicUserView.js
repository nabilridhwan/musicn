const pool = require("../utils/dbConfig");

const PublicUserView = {
	getAllUsers: async () => {
		try {
			let res = await pool.query(
				`SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id;`
			);
			return res.rows;
		} catch (e) {
			throw e;
		}
	},

	getUserByUserID: async (userid) => {
		try {
			let res = await pool.query(
				`SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.user_id = ${userid};`
			);

			return res.rows;
		} catch (e) {
			throw e;
		}
	},

	getUserByUsername: async (username) => {
		try {
			let res = await pool.query(
				`SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.username = '${username}';`
			);
			return res.rows;
		} catch (e) {
			throw e;
		}
	},

	getUserByLikeUsernameOrName: async (username) => {
		try {
			let res = await pool.query(
				`
                SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid
                FROM app_users a 
                LEFT JOIN spotify_users s
                ON a.user_id = s.user_id WHERE (a.username LIKE '%${username}%' OR s."name" LIKE '%${username}%');`
			);
			return res.rows;
		} catch (e) {
			throw e;
		}
	},

	getUserByEmail: async (email) => {
		try {
			let res = await pool.query(
				`
                SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid
                FROM app_users a 
                LEFT JOIN spotify_users s
                ON a.user_id = s.user_id WHERE a.email = "${email}"%');`
			);
			return res.rows;
		} catch (e) {
			throw e;
		}
	},
};

module.exports = PublicUserView;
