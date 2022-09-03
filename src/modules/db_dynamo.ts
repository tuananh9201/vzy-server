import Joi from "joi";
import dynamo from "dynamodb";

dynamo.AWS.config.loadFromPath('config/dynamo_dev.json');



export const User = dynamo.define('User', {
  // hashKey: 'id',
  // rangeKey:'email',
  hashKey:'email',

  timestamps: true,

  schema: {
    id: dynamo.types.uuid(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    passwordHash: Joi.string(),
    profileImage: Joi.string(),
    hash:Joi.string()
  },
});


export const setup = (cb: any) => {
  dynamo.createTables(function (err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Tables has been created');
      cb
    }
  });
}


export default dynamo