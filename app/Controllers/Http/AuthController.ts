import User from 'App/Models/User';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {

	public async register({ request, auth }: HttpContextContract) {

		const validationSchema = schema.create({
			email: schema.string({ trim: true }, [
				rules.email(),
				rules.unique({ table: 'users', column: 'email' }),
			]),
			password: schema.string({ trim: true }, [
				rules.confirmed(),
			]),
		});

		const { email, password } = await request.validate({

			schema: validationSchema,
		});

		const user = await User.create({

			email,
			password,
		});

		await auth.login(user);

		const token = await auth.attempt(email, password);
		return token.toJSON();
	}

	public async login({ request, auth }: HttpContextContract) {
		const email = request.input('email');
		const password = request.input('password');

		const token = await auth.attempt(email, password);
		return token.toJSON();
	}
}
