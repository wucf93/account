-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Transaction";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "transactionType" TEXT NOT NULL,
    "transactionDate" DATETIME NOT NULL,
    "description" TEXT,
    "payee" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- 收入分类 (income) - category_id 1-99
INSERT INTO `category` (`id`, `name`, `type`, `icon`, `color`, `sortOrder`) VALUES
(1, '工资收入', 'income', 'ri-money-dollar-circle-line', 'red', 1),
(2, '奖金收入', 'income', 'ri-medal-line', 'blue', 2),
(3, '投资理财', 'income', 'ri-line-chart-line', 'pink', 3),
(4, '兼职收入', 'income', 'ri-briefcase-line', 'purple', 4),
(5, '租金收入', 'income', 'ri-home-line', 'yellow', 5),
(6, '退款返现', 'income', 'ri-refund-line', 'green', 6),
(7, '其他收入', 'income', 'ri-credit-card-line', 'gray', 7);

-- 支出分类 (expenditure) - category_id 101-199
INSERT INTO `category` (`id`, `name`, `type`, `icon`, `color`, `sortOrder`) VALUES
(101, '餐饮美食', 'expenditure', 'ri-restaurant-line', 'red', 101),
(102, '交通出行', 'expenditure', 'ri-car-line', 'blue', 102),
(103, '购物消费', 'expenditure', 'ri-shopping-bag-line', 'pink', 103),
(104, '住房房租', 'expenditure', 'ri-home-2-line', 'purple', 104),
(105, '生活缴费', 'expenditure', 'ri-lightbulb-line', 'yellow', 105),
(106, '娱乐休闲', 'expenditure', 'ri-gamepad-line', 'green', 106),
(107, '医疗健康', 'expenditure', 'ri-heart-pulse-line', 'orange', 107),
(108, '教育培训', 'expenditure', 'ri-graduation-cap-line', 'blue', 108),
(109, '通讯网络', 'expenditure', 'ri-smartphone-line', 'pink', 109),
(110, '服饰美容', 'expenditure', 'ri-t-shirt-line', 'purple', 110),
(111, '旅行度假', 'expenditure', 'ri-plane-line', 'yellow', 111),
(112, '人情往来', 'expenditure', 'ri-gift-line', 'green', 112),
(113, '宠物用品', 'expenditure', 'ri-bear-smile-line', 'red', 113),
(114, '其他支出', 'expenditure', 'ri-credit-card-line', 'gray', 114);
