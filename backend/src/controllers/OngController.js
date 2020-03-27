const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const ongs = await connection('ongs').select('*');
		return res.json(ongs);
	},
	async store(req, res) {
		const { name, email, city, uf, whatsapp } = req.body;

		const id = crypto.randomBytes(4).toString('HEX');

		await connection('ongs').insert({
			id,
			name,
			email,
			city,
			uf,
			whatsapp
		});
		return res.json({ id });
	}
};
