import { BubbleItemProps } from './components/bubble'

export enum ContentTypeEnum {
  TRANSACTION = 'transaction',
  LOADING = 'loading',
  STRING = 'string',
}

export interface MessageType
  extends Omit<BubbleItemProps, 'footer' | 'content'> {
  content: string
  contentType: ContentTypeEnum
  extra?: string
}
