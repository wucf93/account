import BubbleItem, { type BubbleItemProps } from './item'
import BubbleList, { type BubbleListProps } from './list'

// 为了解决类型错误，需要将 Bubble 转换为具有 List 属性的类型
interface BubbleWithList {
  (props: any): JSX.Element
  List: typeof BubbleList
}

const BubbleWithListComponent = BubbleItem as BubbleWithList
BubbleWithListComponent.List = BubbleList

export default BubbleWithListComponent

export type { BubbleItemProps, BubbleListProps }
