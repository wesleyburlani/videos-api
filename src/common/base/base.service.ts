import 'automapper-ts/dist/automapper';
import { Types } from 'mongoose';
import { InstanceType, Typegoose, ModelType } from 'typegoose';

export abstract class BaseService<T extends Typegoose> {
    protected _model: ModelType<T>;
    protected _mapper: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    async map<K>(
        object: Partial<InstanceType<T>> | Array<Partial<InstanceType<T>>>,
        sourceKey: string = this.modelName,
        destinationKey: string = this.viewModelName,
    ): Promise<K> {
        return this._mapper.map(sourceKey, destinationKey, object);
    }

    async find(filter = {}, page: number = 0, limit: number = 50): Promise<Array<InstanceType<T>>> {
        return this._model.find(filter).skip(page * limit)
        .limit(limit)
        .exec();
    }

    async findById(id: string): Promise<InstanceType<T>> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.create(item);
    }

    async delete(id: string): Promise<InstanceType<T>> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    protected toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
