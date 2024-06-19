npm i in both folder of front end and server folder
then create a mysql database name 'library'

run following commands in server folder
npx prisma init

open .env file and you now need to adjust the connection URL to point to your own database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

migrate data model
npx prisma migrate dev --name init

after this create a admin entry in mysql data base 

use library;
INSERT INTO `library`.`adminlog`
(
`username`,
`password`,
`empName`,
`email`,
`createdByEmp`)
VALUES
( 'admin', '$2b$10$5GV8ISLKz87V1ChsbtMa8u7TOBUItFA.NoIEJtb6nT1zPg7c.6ctm', 'developer', 'xyz@gmail.com','developer');

setup for nodemailer:-
open https://myaccount.google.com/apppasswords in chrome
create a app password with name of your choice 
copy the password and put it in file located at server>controller>env.js 
email="your email";
password="your app password";

setup compelete now run both front end and backend 
commands :-
front end
npm run devHost
backend:-
nodemon app.js

now login with crenditials that you use at creating admin entry in mysql
username:-'admin'
password:-"Admin@123"
