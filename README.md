# URL-Shortener
### An URL Shortener App made in HTML, CSS, JavaScript, NodeJS and MySQL.
The app allows you to create short links of long urls and keep count of link visits.

Database used in the app is ```shorturls``` with one table ```links```:

**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**
```
mysql> desc links;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| longurl    | varchar(255) | YES  |     | NULL    |                |
| shorturlid | varchar(255) | YES  |     | NULL    |                |
| count      | int          | YES  |     | 0       |                |
| id         | int          | NO   | PRI | NULL    | auto_increment |
+------------+--------------+------+-----+---------+----------------+
```
**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**

After successful connection to database and running ```node code.js``` the app should be available at ```http://localhost:5000```
