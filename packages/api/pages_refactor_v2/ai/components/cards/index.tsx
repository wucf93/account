import { ContentTypeEnum } from '../../type'
import { StringContentRender } from './string'
import { LoadingContentRender } from './loading'
import { TransactionContentRender } from './transaction'
import type { CardRenderType } from './type'

export function renderMessageContent(
  type: ContentTypeEnum,
  message: CardRenderType['message'],
  modifyMessages: CardRenderType['modifyMessages']
) {
  switch (type) {
    case ContentTypeEnum.STRING:
      return (
        <StringContentRender
          message={message}
          modifyMessages={modifyMessages}
        />
      )
    case ContentTypeEnum.LOADING:
      return (
        <LoadingContentRender
          message={message}
          modifyMessages={modifyMessages}
        />
      )
    case ContentTypeEnum.TRANSACTION:
      return (
        <TransactionContentRender
          message={message}
          modifyMessages={modifyMessages}
        />
      )
    default:
      return null
  }
}
