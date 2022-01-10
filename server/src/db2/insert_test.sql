INSERT INTO Budgets(type, maxUsage, userId) VALUES ('Shopping',1000,1);
INSERT INTO Transactions(budgetId, userId, description,amount,transactionDate) VALUES (2,10,'Dinner',120, CAST('2022-01-09 17:32:17.976' AS datetime));
