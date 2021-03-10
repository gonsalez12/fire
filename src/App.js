import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: '',
      tokenInput: '',
      idadeInput: ''
    };

    this.cadastrarToken = this.cadastrarToken.bind(this);
    this.cadastrarIdade = this.cadastrarIdade.bind(this);
    this.removerToken = this.removerToken.bind(this);


    let firebaseConfig = {
      apiKey: "AIzaSyDkqcnAjer-nnwuGRVSJY7rGL7STEKhxrk",
      authDomain: "reactapp-f4ac2.firebaseapp.com",
      databaseURL: "https://reactapp-f4ac2-default-rtdb.firebaseio.com",
      projectId: "reactapp-f4ac2",
      storageBucket: "reactapp-f4ac2.appspot.com",
      messagingSenderId: "356875855940",
      appId: "1:356875855940:web:7de3c38e1b0dc21679b411"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
             firebase.initializeApp(firebaseConfig);
             
    }
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


        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }
}