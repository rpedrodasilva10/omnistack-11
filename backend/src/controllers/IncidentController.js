const connection = require('../database/connection');

module.exports = {
	async index(req, res) {
		const { page = 1 } = req.query;

		const rows = 5;

		const [count] = await connection('incidents').count();

		const incidents = await connection('incidents')
			.limit(rows)
			.offset((page - 1) * rows)
			.select('*');

		res.header('X-Total-Count', count['count(*)']);
		return res.json(incidents);
	},
	async store(req, res) {
		const { value, title, description } = req.body;
		const ong_id = req.headers.authorization;

		const [id] = await connection('incidents').insert({
			value,
			title,
			description,
			ong_id
		});

		return res.json({ id });
	},
	async destroy(req, res) {
		const { incident_id } = req.params;

		const ong_id = req.headers.authorization;

		const incident = await connection('incidents')
			.where('id', incident_id)
			.select('ong_id')
			.first();

		if (incident.ong_id !== ong_id) {
			return res.status(401).json({ error: 'Operation not permitted' });
		}

		await connection('incidents')
			.where('id', incident_id)
			.del();

		return res.status(204).send();
	}
};
