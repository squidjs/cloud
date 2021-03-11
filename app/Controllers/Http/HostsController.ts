import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Host from 'App/Models/Host';

export default class HostsController {

	public async get({ auth }: HttpContextContract) {

		await auth.authenticate();

        if(!auth.user)
            return { error: 'Could not find user.' };

        const hosts = await Host.query().where('user_id', auth.user?.id);
		const json: { iv: string, content: string }[] = [];

		hosts.forEach(({ iv, content }) => {

			json.push({ iv, content });
		});

		return json;
	}

	public async create({ request, auth }: HttpContextContract) {

		await auth.authenticate();

		const validationSchema = schema.create({
			iv: schema.string(),
			content: schema.string(),
		});

		const { iv, content } = await request.validate({

			schema: validationSchema,
		});

		await Host.create({

			userId: auth.user?.id,
			iv,
			content,
		});

		return { iv, content };
	}
}
