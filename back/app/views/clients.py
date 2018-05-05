#coding:utf-8

from flask import request, jsonify
from flask_restful import Api, Resource
from app.models.clients import Usuario
from app import app
from app import db
from app.controllers.clients import ControllerClients

class UserList(Resource):
	def post(self):
		try:
			data = request.get_json()
			controller = ControllerClients()
			controller.cadastrar(data['nome'], data['cpf'], data['celular'], data['email'], data['senha'])
			user_id = Usuario.query.order_by('-id').first().id
			return jsonify({"status": "ok", "msg": "Usuário cadastrado com sucesso!", "extra": user_id})
		except Exception as error:
			return jsonify({"status": "erro", "msg": error.message})
			
	def get(self):
		usuarios = Usuario.query.all()
		usuarios_all = []
		for usuario in usuarios:
			usuarios_all.append({"id":usuario.id, "nome": usuario.nome, "cpf": usuario.cpf, "celular": usuario.celular, "email": usuario.email, "senha": usuario.senha})
		return jsonify(usuarios_all)

class User(Resource):
	def get(self, user_id):
		usuario = Usuario.query.filter_by(id=user_id).first()
		if usuario:
			return jsonify({"id":usuario.id, "nome": usuario.nome, "cpf": usuario.cpf, "celular": usuario.celular, "email": usuario.email, "senha": usuario.senha})
		else:
			return jsonify({"status": "erro", "msg": "Usuário não encontrado!"})

	def put(self, user_id):
		try:
			data = request.get_json()
			controller = ControllerClients()
			controller.alterar(user_id, data['nome'], data['cpf'], data['celular'], data['email'], data['senha'])
			return jsonify({"status": "ok", "msg": "Usuário alterado com sucesso!"})
		except Exception as error:
			return jsonify({"status": "erro", "msg": error.message})

	def delete(self, user_id):
		try:
			data = request.get_json()
			controller = ControllerClients()
			controller.remover(user_id)
			return jsonify({"status": "ok", "msg": "Usuário removido com sucesso!"})
		except Exception as error:
			return jsonify({"status": "erro", "msg": error.message})

api = Api(app)
api.add_resource(User, '/users/<int:user_id>')
api.add_resource(UserList, '/users')
