import { Task } from './task.model';

export class TaskController {
  static async getOne(req, res) {
    try {
      const item = await Task
        .findOne({ _id: req.params.id, createdBy: req.user.id });

      if (!item) {
        return res.status(404).end();
      }

      return res.status(200).json({ ...item.toObject() });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }

  static async getMany(req, res) {
    try {
      const items = await Task.find({ createdBy: req.user.id });
      const serializedItems = items.map((item) => item.toObject());

      return res.status(200).json({ items: serializedItems });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }

  static async createOne(req, res) {
    try {
      const item = await Task.create({ ...req.body, createdBy: req.user.id });

      return res.status(201).json({ ...item.toObject() });
    } catch (e) {
      console.error(e);
      return res.status(400).end();
    }
  }

  static async updateOne(req, res) {
    try {
      const updatedItem = await Task
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
  }

  static async removeOne(req, res) {
    try {
      const removedItem = await Task
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
  }
}
