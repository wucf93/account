import axios from 'axios';
/** Transaction Create a new Transaction */
export async function postCreateTransaction(payload?: {
  user_id?: number;
  category_id?: number;
  amount?: number;
  transaction_type?: 'income' | 'expenditure';
  transaction_date?: number;
  description?: any;
  payee?: any;
}) {
  const data = payload;

  const result = await axios.request<{
    success: boolean;
    result: {
      user_id: number;
      category_id: number;
      amount: number;
      transaction_type: 'income' | 'expenditure';
      transaction_date: number;
      description: any;
      payee: any;
    };
  }>({
    url: `/api/transactions`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}

/** Transaction List Transaction */
export async function getListTransaction(payload: { page?: number; per_page?: number }) {
  const params = payload;

  const result = await axios.request<{
    success: boolean;
    result: Array<{
      transaction_id: number;
      user_id: number;
      category_id: number;
      amount: number;
      transaction_type: 'income' | 'expenditure';
      transaction_date: number;
      description: any;
      payee: any;
      created_at: number;
      updated_at: number;
    }>;
  }>({
    url: `/api/transactions`,
    method: 'get',
    params,
    headers: { 'Content-Type': 'application/json' },
  });

  return result;
}
