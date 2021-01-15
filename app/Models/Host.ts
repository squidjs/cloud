import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Host extends BaseModel {

	@column({ isPrimary: true })
	public id: number;

	@column()
	public userId: number;

	@column()
	public iv: string;

	@column()
	public content: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
}
