import { CategorySchema } from '@/models';
import { D1ListEndpoint } from 'chanfana';

const CategoryListModel = CategorySchema;

export class ListCategory extends D1ListEndpoint {
	schema = {
		tags: ["Category"],
		summary: "List Category"
	}
	_meta = {
		model: {
			schema: CategoryListModel,
			primaryKeys: ['category_id'],
			tableName: 'categories',
		},
	};
	filterFields = ['type'];
	dbName = "DB"
	defaultOrderBy = 'sort_order';
}