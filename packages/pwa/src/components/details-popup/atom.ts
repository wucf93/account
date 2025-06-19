import { atom } from 'jotai';
import dayjs, { Dayjs } from 'dayjs';

export enum DetailsType {
    /** 收入 */
    Income = 'income',
    /** 支出 */
    Expenditure = 'expenditure',
}

export interface DetailsPopupInfo {
    visible: boolean,
    type: DetailsType,
    account: string,
    date: Dayjs
}

export const INITIAL_DETAILS_POPUP_INFO: DetailsPopupInfo = {
    visible: false,
    type: DetailsType.Expenditure,
    account: '0',
    date: dayjs()
}

export const detailsPopupInfo = atom<DetailsPopupInfo>(INITIAL_DETAILS_POPUP_INFO);
