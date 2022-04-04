import { ObjectId } from "mongodb";

// prettier-ignore
type modelCallbackType<DbRelatedPromise> = (_id: ObjectId, ...args: any[]) => DbRelatedPromise;

// prettier-ignore
function withObjectId<DbRelatedPromise>(modelCallback: modelCallbackType<DbRelatedPromise>) {
  return function (id: string, ...rest: any[]) {
    const _id = new ObjectId(id);
    return modelCallback(_id, ...rest);
  };
}

export default withObjectId;
