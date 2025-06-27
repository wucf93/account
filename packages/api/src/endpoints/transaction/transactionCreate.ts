import { TransactionSchema } from '@/models';
import { D1CreateEndpoint, } from 'chanfana';

const TransactionCreateModel = TransactionSchema.pick({
	user_id: true,
	category_id: true,
	amount: true,
	transaction_type: true,
	transaction_date: true,
	description: true,
	payee: true,
})

export class CreateTransaction extends D1CreateEndpoint {
	schema = {
		tags: ["Transaction"],
		summary: "Create a new Transaction"
	}
	_meta = {
		model: {
			schema: TransactionCreateModel,
			primaryKeys: ['transaction_id'],
			tableName: 'transactions'
		},

	};
	dbName = "DB"
}