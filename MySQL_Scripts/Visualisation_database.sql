#INSERT INTO users (firstname, lastname) VALUES ('Shamel', 'Hakij');

#INSERT INTO address (email, mobile, customer_id) VALUES ('shamel@hotmail.com', '077650098', last_insert_id());

CREATE TABLE users (
    user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    matrixID varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL
);

CREATE TABLE address (
    street varchar(255),
    city varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    userID int NOT NULL,
    foreign key (userID) references users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

Create Table dob (
	userID int NOT NULL,
    birthdate date Not null,
    birthPlace varchar(255),
    foreign key (userID) references users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );
    