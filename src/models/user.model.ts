import {model, Schema, Document, Model} from 'mongoose';
import bcrypt from 'bcryptjs';
import * as userType from '../types/user';

/* Mongoose isn't well integrated with typescript that's why we have to do this interface garbage*/

/*so... typescript and mongoose need to know about the types. Schema need to know the model type
and the document type. model function need to know the document type and the model type, 
and then you do a interface for yourself for type checking when creating your document.
Reason: You have to take care of it as you have a model with custom properties.
*/

/*Model interface for typescript and mongoose to understand the propeties of our model */
interface IUserModel extends Model<userType.IUserDocument>{
  build(user: userType.IUser): userType.IUserDocument;
}

const userSchema = new Schema<userType.IUserDocument>({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: {type: String},
  JWTSession: {refreshTokens: []}
}, {
  timestamps: true,
});

userSchema.methods.genPassword =  (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/* here typescript doesn't complain about `this.password` being undefined, 
since we defined it on the UserDocument interface*/
userSchema.methods.validatePassword = function(password : string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.statics.build = (user : userType.IUser) => {
  return new User(user);
}

userSchema.pre<userType.IUserDocument>("save", function(next) {
    if (this.isModified("password")) {
      this.password = this.genPassword(this.password);
    }
    next();
});

const User = model<userType.IUserDocument, IUserModel>('User', userSchema);

export default User;
