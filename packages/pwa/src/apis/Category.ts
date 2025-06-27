import axios from 'axios';
/** Category List Category */
export async function getListCategory(payload: {
  page?: number;
  per_page?: number;
  type?: 'income' | 'expenditure';
}) {
  const params = payload;

  const result = await axios.request<{
    success: boolean;
    result: Array<{
      category_id: number;
      name: string;
      type: 'income' | 'expenditure';
      icon: string;
      color: string;
      sort_order: number;
      created_at: number;
      updated_at: number;
    }>;
  }>({
    url: `/api/categories`,
    method: 'get',
    params,
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}
