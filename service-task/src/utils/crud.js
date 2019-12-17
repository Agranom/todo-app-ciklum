export const getOne = model => async (req, res) => {
  try {
    const item = await model
      .findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).end();
    }

    res.status(200).json({ ...item.toObject() });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getMany = model => async (req, res) => {
  try {
    const items = await model.find();
    const serializedItems = items.map(item => item.toObject());

    res.status(200).json({ items: serializedItems });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const createOne = model => async (req, res) => {
  try {
    const item = await model.create(req.body);

    res.status(201).json({ ...item.toObject() });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = model => async (req, res) => {
  try {
    const updatedItem = await model
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).end();
    }

    res.status(200).json({ ...updatedItem.toObject() });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = model => async (req, res) => {
  try {
    const removedItem = await model
      .findOneAndRemove({ _id: req.params.id })
      .lean()
      .exec();

    if (!removedItem) {
      return res.status(404).end();
    }

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};


export const crudControllers = model => {
  return {
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model)
  };
};
