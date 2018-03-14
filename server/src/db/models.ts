import { prop, Typegoose, ModelType, InstanceType, Ref } from 'typegoose';

export class User extends Typegoose {
  @prop() displayName: string;
  @prop({unique: true}) userID: string;
  @prop({required:true}) level: number;
}

export class Entry extends Typegoose {
  @prop({required:true}) pattern: string;
  @prop({required:true}) description: string; // a lengthy description of the pattern, origin, virustotal links, ...
  @prop({
    required:true,
    enum: ["regex", "url", "domain"]
  }) type: string; // type of pattern ("regex", "url", "domain")
  @prop({required:true}) class: string; // class of spam ("spam", "malicious", "referral")
  @prop({required:true}) risk: number; // risk (0-100)
  // this intentionally does NOT have a foreign key to user,
  // since the user can originate from another server.
  @prop({required:true}) author: User;
}

export class Auth extends Typegoose {
  @prop({ref:User, required: true}) user: Ref<User>;
  @prop({required:true}) token: string;
  @prop({required:true}) expires: Date;
}

export const userModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true }});
export const entryModel = new Entry().getModelForClass(Entry, { schemaOptions: { timestamps: true }});
export const authModel = new Auth().getModelForClass(Auth, { schemaOptions: { timestamps: true }});
