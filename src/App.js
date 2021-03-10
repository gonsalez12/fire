import React, {Component} from 'react';
import firebase  from './fireConection'


export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: '',
      tokenInput: '',
      idadeInput: '',
      nomeInput: '',
      idade2Input: '',
      lista: []
    };

    this.cadastrarToken = this.cadastrarToken.bind(this);
    this.cadastrarIdade = this.cadastrarIdade.bind(this);
    this.removerToken = this.removerToken.bind(this);
    this.cadastroUsuario = this.cadastroUsuario.bind(this);


     /* modo realtime */
    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state); 
     })
    
     /* modo que ve so mente quando carrega  
     firebase.database().ref('token').once('value').then((snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state); 
     })
     */
     firebase.database().ref('usuarios').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state); 
     })

     firebase.database().ref('usuarios').on('value', (snapshot) => {
      let state = this.state;
      state.lista = [];
      snapshot.forEach((childItem) =>{

        state.lista.push({
          key: childItem.key,
          nome: childItem.val().nome,
          idade: childItem.val().idade
        })

      });

      this.setState(state);

     });



  }

  cadastrarToken(e){
    //inserir ou update com um unico objeto
    firebase.database().ref('token').set(this.state.tokenInput);
    e.preventDefault();

  }
  cadastrarIdade(e){

    //inserir ou update objeto dentro de uma arvore
    firebase.database().ref('usuarios').child(1).child('idade').set(this.state.idadeInput);
    e.preventDefault();

  }

  removerToken(){
    //remover o objeto
    firebase.database().ref('token').remove();
  }

  cadastroUsuario(e){
    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idade2Input
    });
    e.preventDefault();
  }

  render(){
    const { token, nome, idade } = this.state;
    return(
      <div>
        <form onSubmit={this.cadastrarToken}>
          <input type="text" value={this.state.tokenInput} 
            onChange={(e) => this.setState({tokenInput: e.target.value})} />
          <br></br>
          <button type="submit">Cadastrar token </button>
        </form>
        <br></br>
        
        <button onClick={this.removerToken}>Remover token</button>
        <br></br>  
              
        <form onSubmit={this.cadastrarIdade}>
          <input type="number" value={this.state.idadeInput} 
            onChange={(e) => this.setState({idadeInput: e.target.value})} />
          <br></br>
          <button type="submit">Cadastrar idade </button>
        </form>
        <br></br>

        Cadastro de usuario

        <br></br>  
              
        <form onSubmit={this.cadastroUsuario}>
        <input type="text" value={this.state.nomeInput} 
            onChange={(e) => this.setState({nomeInput: e.target.value})} />
          <br></br>
          <input type="number" value={this.state.idade2Input} 
            onChange={(e) => this.setState({idade2Input: e.target.value})} />
          <br></br>
          <button type="submit">Cadastrar Usuario </button>
        </form>

        

        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>

        <hr></hr>
        {
          this.state.lista.map((item) =>{
            return(
              <div>
                <h1>Token: {item.key}</h1>
                <h1>Nome: {item.nome}</h1>
                <h1>Idade: {item.idade}</h1>
              </div>  
            );
          })
        }



      </div>
    );
  }
}