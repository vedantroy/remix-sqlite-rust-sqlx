-- Add migration script here
CREATE TABLE Users (
	id VARCHAR(32) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE GoogleIdentity (
	-- Identity Mixin
	user_id VARCHAR(32) NOT NULL,
	-- End Identity Mixin

	sub VARCHAR(255) NOT NULL,
	displayName VARCHAR(32) NOT NULL,
	-- https://stackoverflow.com/questions/1297272/how-long-should-sql-email-fields-be#:~:text=The%20actual%20maximum%20email%20length,subsequently%20accepted%20this%20was%20wrong.%22
	-- max length = 319 + @ = 320
	-- NVARCHAR supports Unicode
	email NVARCHAR(320) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users(id)
);