import { ObjectId } from "mongodb";

type ModifiedParams<Params> = {
  [key in keyof Params]: key extends "_id" ? ObjectId | string : Params[key];
};

// prettier-ignore
function withObjectId<DbRelatedPromise, ExtendedParams extends {_id: ObjectId}> (
  modelCallback: (params: ExtendedParams) => DbRelatedPromise
) {
  return function(params: ModifiedParams<ExtendedParams>) {
    const newParams = {...params}
    if (typeof newParams._id == "string") newParams._id = new ObjectId(params._id);

    return modelCallback(newParams as ExtendedParams);
  };
}

export default withObjectId;
