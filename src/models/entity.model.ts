import { Schema, Model, Document, model, HookNextFunction } from 'mongoose'
import shortid = require('shortid')
import ApiError from '../utils/apiError'

export interface IEntityModel extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}


export class Entity<T extends Document> {
  protected _model: Model<T>

  constructor (schema: Schema, name: string) {
    schema.add({
      _id: {
        type: String,
        default: shortid.generate
      }
    })
    schema.post('save', function(err, res, next: HookNextFunction) {
      if (err.code === 11000) {
        const error = new ApiError(`Duplicate Key ${JSON.stringify(err.keyValue)}`, 409)
        next(error)
      }
      next()
    })
    this._model = model<T>(name, schema)
  }

  public get model(): Model<T> {
    return this._model
  }

  public async findById (id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async create(data: any): Promise<T> {
    try {
      const newDoc = new this._model(data);
      const returnDoc = await newDoc.save();
      console.log('returnDoc', returnDoc)
      return returnDoc
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async findAll(queryData: any): Promise<T[]> {
    try {
      const query = {}
      for(let key in queryData) {
        if (queryData[key]) {
          query[key] = queryData[key]
        }
      }
      console.log('quryr', query)
      return await this._model.find(query)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}