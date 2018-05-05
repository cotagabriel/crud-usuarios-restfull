#coding:utf-8

from app.models.clients import Usuario
from sqlalchemy import or_
from sqlalchemy import and_
from app import db

class ControllerClients:
    def __init__(self, user_id=None, nome=None, cpf=None, celular=None, email=None,senha=None):
        self.user_id = user_id
        self.nome = nome
        self.cpf = cpf
        self.celular = celular
        self.email = email
        self.senha = senha

    def cadastrar(self, nome, cpf, celular, email, senha):
        def check_exist_user(cpf, celular, email):
            cadastrado = Usuario.query.filter(or_(Usuario.cpf == cpf, Usuario.celular == celular, Usuario.email == email)).first()
            if cadastrado:
                raise Exception("O cpf, celular e/ou email já foi cadastrado para outro usuário.")

        check_exist_user(cpf=cpf, celular=celular, email=email)
        novo = Usuario(nome=nome, cpf=cpf, celular=celular, email=email, senha=senha)
        db.session.add(novo)
        db.session.commit()

    def alterar(self, user_id, nome, cpf, celular, email, senha):
        def check_exist_user_update(user_id, cpf, celular, email):
            cadastrado = Usuario.query.filter(or_(Usuario.cpf == cpf, Usuario.celular == celular, Usuario.email == email), and_(Usuario.id != user_id)).first()
            if cadastrado:
                raise Exception("O cpf, celular e/ou email já foi utilizado para outro usuário.")

        check_exist_user_update(user_id = user_id, cpf=cpf, celular=celular, email=email)
        usuario = Usuario.query.get(user_id)
        usuario.nome = nome
        usuario.cpf = cpf
        usuario.celular = celular
        usuario.email = email
        usuario.senha = senha
        db.session.commit()

    def remover(self, user_id):
        usuario = Usuario.query.get(user_id)
    	db.session.delete(usuario)
    	db.session.commit()
