CREATE TABLE Accounts( 
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  userId int NOT NULL,
  name varchar(50) NOT NULL, 
  balance int NOT NULL, 
  accountHolder varchar(30) NOT NULL, 
  accountDueDay int NOT NULL, 
  lastPayment varchar(27),
  createdOn datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Payments( 
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  userId int NOT NULL,
  accountId int NOT NULL,
  amountPaid int NOT NULL, 
  paymentDate varchar(27),
  createdOn datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (accountId) REFERENCES Accounts(id)
);

CREATE TABLE Users( 
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  username varchar(50) NOT NULL UNIQUE, 
  password varchar(60) NOT NULL, 
  salt varchar(30) NOT NULL, 
  phone varchar(11), 
  createdOn datetime DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE Budgets(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type varchar(25) NOT NULL,
  maxUsage int NOT NULL,
  userId int NOT NULL,
  createdOn datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Transactions(
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  budgetId int NOT NULL,
  userId int NOT NULL,
  description varchar(250) NOT NULL, 
  amount int NOT NULL,
  transactionDate datetime,
  createdOn datetime DEFAULT CURRENT_TIMESTAMP,  
  FOREIGN KEY (budgetId) REFERENCES Budgets(id),
  FOREIGN KEY (userId) REFERENCES Users(id)
);