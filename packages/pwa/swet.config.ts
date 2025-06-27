/**
 * 以下生成了一些可能会用到的常用配置项
 */

import { SwetCliConfig } from '@swet/cli'

export const swet: SwetCliConfig = {
  /** 文档地址数据源，同时支持远程路径和本地路径 */
  sources: ["http://localhost:8787/openapi.json"],
  /** 生成代码存放目录 */
  outDir: './src/apis',
}
