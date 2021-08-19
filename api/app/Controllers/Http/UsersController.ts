import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import UsersRepository from "App/Repositories/UsersRepository";
import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";
import Logger from '@ioc:Adonis/Core/Logger'
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class UsersController {
  private usersRepository: UsersRepository;
  constructor(){
    this.usersRepository = new UsersRepository()
  }
  public async index(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        user: 'Donald',
      },
      {
        id: 2,
        title: 'Jean',
      },
    ]
  }
  async create ({request, response}) {

    const newAccountSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed()]),
    })
    try {
      const payload = await request.validate({
        schema: newAccountSchema
      })
      return await this.usersRepository.create(payload)
    } catch (error) {
      Logger.error({ err: new Error(error) }, 'Account creation failed')
      response.conflict(error.messages)
    }
  }
}
