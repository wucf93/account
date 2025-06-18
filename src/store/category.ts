import { atom } from 'jotai';

export enum DetailsType {
    /** 收入 */
    Income = 'income',
    /** 支出 */
    Expenditure = 'expenditure',
}

export interface CategoryConfig {
    icon: string,
    name: string,
    color: string,
}

export const expenditureCategoryConfigs = atom<CategoryConfig[]>([
    { name: "餐饮", icon: "ri-restaurant-line", color: "blue" },
    { name: "购物", icon: "ri-shopping-bag-line", color: "red" },
    { name: "交通", icon: "ri-taxi-line", color: "purple" },
    { name: "住房", icon: "ri-home-line", color: "yellow" },
    { name: "医疗", icon: "ri-heart-pulse-line", color: "green" },
    { name: "教育", icon: "ri-book-line", color: "orange" },
    { name: "娱乐", icon: "ri-movie-line", color: "blue" },
    { name: "服饰", icon: "ri-t-shirt-line", color: "pink" },
    { name: "通讯", icon: "ri-phone-line", color: "indigo" },
]);

export const incomeCategoryConfigs = atom<CategoryConfig[]>([
    { name: "工资", icon: "ri-bank-card-line", color: "green" },
    { name: "奖金", icon: "ri-red-packet-line", color: "red" },
    { name: "红包", icon: "ri-refund-2-line", color: "orange" },
    { name: "转账", icon: "ri-refund-2-line", color: "blue" },
    { name: "报销", icon: "ri-refund-2-line", color: "pink" },
    { name: "礼金", icon: "ri-gift-line", color: "purple" },
]);
