from app import db

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(60))
    cpf = db.Column(db.String(14), unique=True)
    celular = db.Column(db.String(19), unique=True)
    email = db.Column(db.String(120), unique=True)
    senha = db.Column(db.String(255))

    def __init__(self, nome, cpf, celular, email, senha):
        self.nome = nome
        self.cpf = cpf
        self.celular = celular
        self.email = email
        self.senha = senha

    def __repr__(self):
        return "<Usuario %r>" % self.nome
