import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Hosts extends BaseSchema {

	protected tableName = 'hosts';

	public async up () {

		this.schema.createTable(this.tableName, (table) => {

			table.increments('id');
			table.integer('user_id');
			table.text('iv');
			table.text('content');
			table.timestamps(true);
		});
	}

	public async down () {

		this.schema.dropTable(this.tableName);
	}
}
