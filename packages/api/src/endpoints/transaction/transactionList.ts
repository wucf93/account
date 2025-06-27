import { TransactionSchema } from '@/models';
import { D1ListEndpoint } from 'chanfana';

const TransactionListModel = TransactionSchema;

export class ListTransaction extends D1ListEndpoint {
	schema = {
		tags: ["Transaction"],
		summary: "List Transaction"
	}
	_meta = {
		model: {
			schema: TransactionListModel,
			primaryKeys: ['transaction_id'],
			tableName: 'transactions',
		},
	};
	dbName = "DB"
}