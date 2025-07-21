import { MessageType } from '../../type'

export interface CardRenderType {
  message: MessageType
  modifyMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
}
