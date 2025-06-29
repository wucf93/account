import axios from 'axios';
/** Category 分类列表 */
export async function getCategoryListRoute() {
  const result = await axios.request<{
    success: boolean;
    result: Array<{
      id: number;
      name: string;
      type: 'income' | 'expenditure';
      icon: string;
      color: string;
      sortOrder: number;
    }>;
  }>({
    url: `/api/category/list`,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}
