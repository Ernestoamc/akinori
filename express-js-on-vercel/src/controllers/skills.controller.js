const Skill = require('../models/Skill');
const asyncHandler = require('../utils/asyncHandler');

const mapSkill = (item) => ({
	...item,
	id: item._id.toString(),
	_id: undefined,
});

const parseLevel = (value) => {
	const num = Number(value);

	if (!Number.isInteger(num) || num < 0 || num > 100) {
		return null;
	}

	return num;
};

const getAll = asyncHandler(async (_req, res) => {
	const items = await Skill.find().sort({ level: -1, createdAt: -1 }).lean();
	const mappedItems = items.map(mapSkill);

	res.status(200).json({
		ok: true,
		count: mappedItems.length,
		data: mappedItems,
	});
});

const getById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const item = await Skill.findById(id).lean();

	if (!item) {
		return res.status(404).json({
			ok: false,
			message: 'Habilidad no encontrada.',
		});
	}

	res.status(200).json({
		ok: true,
		data: mapSkill(item),
	});
});

const create = asyncHandler(async (req, res) => {
	const { name, level } = req.body;

	if (!name || level === undefined) {
		return res.status(400).json({
			ok: false,
			message: 'Nombre y nivel son obligatorios.',
		});
	}

	const parsedLevel = parseLevel(level);

	if (parsedLevel === null) {
		return res.status(400).json({
			ok: false,
			message: 'El nivel debe ser un numero entero entre 0 y 100.',
		});
	}

	const newItem = await Skill.create({
		name,
		level: parsedLevel,
	});

	const itemObj = newItem.toObject();

	res.status(201).json({
		ok: true,
		message: 'Habilidad creada correctamente.',
		data: mapSkill(itemObj),
	});
});

const update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, level } = req.body;
	const updateData = {};

	if (name !== undefined) {
		updateData.name = name;
	}

	if (level !== undefined) {
		const parsedLevel = parseLevel(level);

		if (parsedLevel === null) {
			return res.status(400).json({
				ok: false,
				message: 'El nivel debe ser un numero entero entre 0 y 100.',
			});
		}

		updateData.level = parsedLevel;
	}

	const item = await Skill.findByIdAndUpdate(id, updateData, {
		new: true,
		runValidators: true,
	}).lean();

	if (!item) {
		return res.status(404).json({
			ok: false,
			message: 'Habilidad no encontrada.',
		});
	}

	res.status(200).json({
		ok: true,
		message: 'Habilidad actualizada correctamente.',
		data: mapSkill(item),
	});
});

const remove = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const item = await Skill.findByIdAndDelete(id);

	if (!item) {
		return res.status(404).json({
			ok: false,
			message: 'Habilidad no encontrada.',
		});
	}

	res.status(200).json({
		ok: true,
		message: 'Habilidad eliminada correctamente.',
	});
});

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
