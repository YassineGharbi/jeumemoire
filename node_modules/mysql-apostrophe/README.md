# mysql-apostrophe 

Whenever we want to save any field with apostophe in mysql, and we use syntex like 
var query = `INSERT INTO table_name (column1) VALUES ('${var}');` ; 

It will throw mysql error if your var is equals to alex's. This NPM is use to avoid this kind of errors. It is not working if you are sending data as JSON stringify.

## Example

``` js

var mysqlApostrophe = require("mysql-apostrophe");

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(mysqlApostrophe); //must be after bodyparser


```

## Install

``` cli
npm i mysql-apostrophe
```

## License

MIT
