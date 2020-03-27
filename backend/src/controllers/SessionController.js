const db = require('../database/connection');

module.exports = {
	async store(req, res) {
		const { id: ong_id } = req.body;

		const ong = await db('ongs')
			.where('id', ong_id)
			.select('name')
			.first();

		if (!ong) {
			return res.status(404).json({ error: 'ONG not found' });
		}

		return res.json(ong);
	}
};
