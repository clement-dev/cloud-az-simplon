import Users from "App/Models/Users";


export default class UsersRepository {
  private user: Users;
  constructor(){
     this.user = new Users()
  }
  public async create(payload) {
    const res = await this.user.fill(payload)
      .save()
    return {
      success: this.user.$isPersisted,
      response: res
    }
  }
}
