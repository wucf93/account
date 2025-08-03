// 使用示例
// @example console.log(formatNumber(10000.2233)); // 输出: "10,000.22"
// @example console.log(formatNumber(1234567.891)); // 输出: "1,234,567.89"
// @example console.log(formatNumber(500.2)); // 输出: "500.20"
export function formatNumber(num: number | string) {
  const number = (typeof num === 'string' ? parseFloat(num) : num) || 0

  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
