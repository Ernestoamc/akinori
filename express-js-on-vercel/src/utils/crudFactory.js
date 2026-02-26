const asyncHandler = require('../utils/asyncHandler');

function createCrudControllers(Model, resourceName = 'Recurso') {
  const getAll = asyncHandler(async (_req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: -1 }).lean();

    const mappedItems = items.map((item) => ({
      ...item,
      id: item._id.toString(),
      _id: undefined,
    }));

    res.status(200).json({
      ok: true,
      count: mappedItems.length,
      data: mappedItems,
    });
  });

  const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const item = await Model.findById(id).lean();

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: `${resourceName} no encontrado.`,
      });
    }

    const mappedItem = {
      ...item,
      id: item._id.toString(),
      _id: undefined,
    };

    res.status(200).json({
      ok: true,
      data: mappedItem,
    });
  });

  const create = asyncHandler(async (req, res) => {
    const newItem = await Model.create(req.body);
    const itemObj = newItem.toObject();

    const mappedItem = {
      ...itemObj,
      id: itemObj._id.toString(),
      _id: undefined,
    };

    res.status(201).json({
      ok: true,
      message: `${resourceName} creado correctamente.`,
      data: mappedItem,
    });
  });

  const update = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const item = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: `${resourceName} no encontrado.`,
      });
    }

    const mappedItem = {
      ...item,
      id: item._id.toString(),
      _id: undefined,
    };

    res.status(200).json({
      ok: true,
      message: `${resourceName} actualizado correctamente.`,
      data: mappedItem,
    });
  });

  const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const item = await Model.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: `${resourceName} no encontrado.`,
      });
    }

    res.status(200).json({
      ok: true,
      message: `${resourceName} eliminado correctamente.`,
    });
  });

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

module.exports = createCrudControllers;
