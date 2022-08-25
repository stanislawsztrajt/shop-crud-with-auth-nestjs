import { Exclude } from "class-transformer";

export interface Iuser {
  _id: string;
  name: string;
  password: string;
  role: string;
  email: string;
}

export class SerializedUser {
  _id: any
  __v: number
  name: string
  role: string

  @Exclude()
  email: string

  @Exclude()
  password: string


  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial)
  }
}