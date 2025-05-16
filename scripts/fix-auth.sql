ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password123';

FLUSH PRIVILEGES;

SELECT user, host, plugin FROM mysql.user WHERE user = 'root'; 