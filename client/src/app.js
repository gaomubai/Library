import { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            books: []
        }
  }

  getData(){
    const url = " http://localhost:9000/book/allbooks";
    try {
      fetch(url, {
          method: "GET",
          headers: {
              "Content-type":"application/json;charset=utf-8",
              "Accept": 'application/json',
          }
      }).then( res => res.json())
        .then( data => {
          console.log(data.data)
          this.setState({ books: data.data });
          console.log(this.state.books)
        });
    } catch (error) {
        throw error;
    }
  }

  componentDidMount() {
        this.getData()
  }
 
  render() {
    const { books } = this.state;
    if (!localStorage.getItem("userData")){
      return (
        <div className="App">
          <Button type="primary" style={{marginRight: 10}} onClick={ ()=>{
                      this.props.history.push({
                          pathname : '/SignUp',
                          state :{id:3}});}}>Sign up</Button>
          <Button type="primary" onClick={ ()=>{
            this.props.history.push({pathname : '/SignIn'});}} >Sign in</Button>
          <div>
              <Collapse style={{marginTop: 10}}>
                {books.map((book) =>
                  <Panel header={book.title} key={book.id}>
                    <p>{book.summary}</p>
                    <Button type="link" onClick={ ()=>{
                      this.props.history.push({pathname : '/SignIn'});}}>Login First</Button>
                  </Panel>
                )}
              </Collapse>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Button type="primary" style={{marginRight: 10}} onClick={ ()=>{
                      this.props.history.push({pathname : '/AddBook'});}}>Adding Book</Button>
          <Button type="primary" onClick={ ()=>{
            localStorage.removeItem("userData");
            localStorage.removeItem("userId");
            this.props.history.push({pathname : '/SignIn',state :{id:3}});
            }} >Sign out</Button>
          <div>
            <Collapse style={{marginTop: 10}}>
              { books.map((book) =>
                <Panel header={book.title} key={book.id}>
                  <p>{book.summary}</p>
                  <Button type="link" onClick={ ()=>{
                      this.props.history.push({pathname : `/ShowBook/${book.id}`});}}>Details</Button>
                </Panel>
              ) }
            </Collapse>
          </div>
        </div>
      );
    }
  }
}

export default App;
