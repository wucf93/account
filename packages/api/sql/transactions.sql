DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
	`transaction_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`amount` numeric DEFAULT '0' NOT NULL,
	`transaction_type` TEXT NOT NULL CHECK (`transaction_type` IN ('income', 'expenditure')),
	`transaction_date` integer NOT NULL,
	`description` text,
	`payee` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);