export const getOne = (model) => async (req, res) => {
  try {
    const item = await model
      .findOne({ _id: req.params.id, createdBy: req.user.id });

    if (!item) {
      return res.status(404).end();
    }

    return res.status(200).json({ ...item.toObject() });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const items = await model.find({ createdBy: req.user.id });
    const serializedItems = items.map((item) => item.toObject());

    return res.status(200).json({ items: serializedItems });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

export const createOne = (model) => async (req, res) => {
  try {
    const item = await model.create({ ...req.body, createdBy: req.user.id });

    return res.status(201).json({ ...item.toObject() });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedItem = await model
      .findOneAndUpdate({ _id: req.params.id, createdBy: req.user.id }, req.body, { new: true })
      .lean()
      .exec();

    if (!updatedItem) {
      return res.status(404).end();
    }

    return res.status(204).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const removeOne = (model) => async (req, res) => {
  try {
    const removedItem = await model
      .findOneAndRemove({ _id: req.params.id, createdBy: req.user.id })
      .lean()
      .exec();

    if (!removedItem) {
      return res.status(404).end();
    }

    return res.status(204).end();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};


export const crudControllers = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});
