# CRUD de usários

Este repositório contém o backend e front de um CRUD de usuários utilizando REST API com Flask e Flask-SQLAlchemy.

* Backend: Python, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-Script
* Frontend: JavaScript, AngularJS, Bootstrap CSS, SweetAlert e AngularJS ui-Mask

Para mais detalhes veja o requirements.txt.


## **Setup**

**Clone o repositório:**
```
$ git clone https://github.com/cotagabriel/crud-usuarios.git
$ cd crud-usuarios
```


**Instale as dependencias:**
```
$ pip install -r requirements.txt
```


**Instale o banco de dados Postgres:**
* Baixar PostgreSQL v10.3: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
* Instalar o banco
* Criar a tabela **crud**


**Crie a tabela utilizando o Flask-Migrate:**
```
$ python run.py db init
$ python run.py db migrate
$ python run.py db upgrade
```


## **Como utilizar**

**Backend - rode a aplicação:**
```
$ python run.py runserver
```


**Frontend:**
* Mova a pasta front para a pasta raiz de um servidor (XAMP, WAMP, etc)
* Rode a aplicação no navegador (geralmente: http://localhost/front)
