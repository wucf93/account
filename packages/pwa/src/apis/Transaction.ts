import axios from 'axios';
/** Transaction 创建交易记录 */
export async function postTransactionCreateRoute(payload?: {
  categoryId?: number;
  amount?: number;
  transactionType?: 'income' | 'expenditure';
  transactionDate?: string;
  description?: any;
  payee?: any;
}) {
  const data = payload;

  const result = await axios.request<{ success: boolean }>({
    url: `/api/transaction/create`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}

/** Transaction 获取交易列表 */
export async function getTransactionListRoute(payload: { transactionDate: number }) {
  const result = await axios.request<{
    success: boolean;
    result: Array<{
      id: number;
      userId: number;
      amount: number;
      transactionType: 'income' | 'expenditure';
      transactionDate: string;
      description: any;
      payee: any;
      createdAt: string;
      updatedAt: string;
      categoryId: number;
      category: {
        id: number;
        name: string;
        type: 'income' | 'expenditure';
        icon: string;
        color: string;
        sortOrder: number;
      };
    }>;
  }>({
    url: `/api/transaction/list/${payload.transactionDate}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}

/** Transaction 删除交易记录 */
export async function deleteTransactionDeleteRoute(payload: { transactionId: number }) {
  const result = await axios.request<{ success: boolean }>({
    url: `/api/transaction/list/${payload.transactionId}`,
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}
