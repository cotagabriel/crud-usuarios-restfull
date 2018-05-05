var App = angular.module('App');

App.controller('UsuarioController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){

  $scope.limpar = function(){
    $scope.id = '';
    $scope.nome = '';
    $scope.cpf = '';
    $scope.celular = '';
    $scope.email = '';
    $scope.senha = '';
    $scope.form.$setPristine();
    $scope.form.$setUntouched();
    document.getElementById('nome').focus();
  };

  $scope.cadastrar = function(nome, cpf, celular, email, senha, isValid){
    if (isValid) {
      usuario = {'nome': nome, 'cpf': cpf, 'celular': celular, 'email': email, 'senha': senha};
      $http.post('http://127.0.0.1:5000/users', usuario)
      .then(function(response){
        if (response.data.status == 'ok') {
          usuario = {'id': response.data.extra, 'nome': nome, 'cpf': cpf, 'celular': celular, 'email': email, 'senha': senha};
          $scope.listar.push(usuario);
          $scope.form.$setPristine();
          $scope.form.$setUntouched();
          $scope.id = '';
          $scope.nome = '';
          $scope.cpf = '';
          $scope.celular = '';
          $scope.email = '';
          $scope.senha = '';
          document.getElementById('nome').focus();
          swal("Cadastrado!", "Usuário cadastrado com sucesso.", "success");
        } else {
          swal("Ops, algo deu errado!", response.data.msg, "error");
        }
      }, function(err){
        console.log(err);
      });
    }
  };

  $http.get('http://127.0.0.1:5000/users')
  .then(function(response){
    $scope.listar = response.data;
  }, function(err){
    console.log(err);
  });

  $scope.preAlterar = function(usuario, index) {
    $scope.id = usuario.id;
    $scope.nome = usuario.nome;
    $scope.cpf = usuario.cpf;
    $scope.celular = usuario.celular;
    $scope.senha = usuario.senha;
    $scope.email = usuario.email;
    document.getElementById('nome').focus();
  };

  $scope.alterar = function(user_id, nome, cpf, celular, email, senha, isValid) {
    if (isValid) {
      usuario = {'nome': nome, 'cpf': cpf, 'celular': celular, 'email': email, 'senha': senha};
      $http.put('http://127.0.0.1:5000/users/' + user_id, usuario)
      .then(function(response){
        if (response.data.status == 'ok') {
          for (var i = $scope.listar.length - 1; i >= 0; i--) {
            if ($scope.listar[i].id == user_id){
              $scope.listar[i].nome = nome;
              $scope.listar[i].cpf = cpf;
              $scope.listar[i].celular = celular;
              $scope.listar[i].email = email;
              $scope.listar[i].senha = senha;
              break;
            }
          }
          $scope.form.$setPristine();
          $scope.form.$setUntouched();
          $scope.id = '';
          $scope.nome = '';
          $scope.cpf = '';
          $scope.celular = '';
          $scope.email = '';
          $scope.senha = '';
          document.getElementById('nome').focus();
          swal("Alterado!", "Usuário alterado com sucesso.", "success");
        } else {
          swal("Ops, algo deu errado!", response.data.msg, "error");
        }
      }, function(err){
        console.log(err);
      });
    }
  };

  $scope.remover = function(user_id, index) {
    swal({
      title: "Realmente deseja remover o usuário?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Sim, por favor!",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false
    },
    function(isConfirm) {
      if (isConfirm) {
        $http.delete('http://127.0.0.1:5000/users/' + user_id)
        .then(function(response){
          if (response.data.status == 'ok') {
            $scope.listar.splice(index, 1);
            swal("Removido!", "Usuário removido com sucesso.", "success");
          } else {
            swal("Ops, algo deu errado!", response.data.msg, "error");
          }
        }, function(err){
          console.log(err);
        });
      }
    });
  };

}]);
