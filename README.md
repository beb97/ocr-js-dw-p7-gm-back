##
* npm install : pour installer
* npm start : pour lancer le projet

## mysql server
TCP-IP
* port : 3306
* windows service name : MySQL80
* URL :
* login : root 
* password : root

## sequelize tuto 
* Mise en place : 
https://www.bezkoder.com/node-js-express-sequelize-mysql/
* Associations : 
  https://www.bezkoder.com/sequelize-associate-one-to-many/

## mysql connect SHELL
mysql --host=localhost --user=root --password=root groupomania
show databases;
use groupomania;
show tables;
select * from users;

## mysql workbench bug
* Open language settings
* Click "Administrative language settings" at the right top of the Window
* Click "Change system locale"
* Select English (United States) for example
* Click OK
* Restart the system

## SSL
https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt