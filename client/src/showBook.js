import { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;

class ShowBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            summary: '',
            genres: '',
            userId: -1
        }
    } 

    getData(){
        const { id } = this.props.match.params
        console.log(id);
        const url = `http://localhost:9000/book/getBook/${id}`;
        try {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type":"application/json;charset=utf-8",
                "Accept": 'application/json',
            }
        }).then( res => res.json())
            .then( data => {
                this.setState({ 
                    title: data.data[0].title, 
                    author: data.data[0].author, 
                    genres: data.data[0].genres, 
                    summary: data.data[0].summary,
                    userId: data.data[0].uploaderId
                });
            });
        } catch (error) {
            throw error;
        }
    }

    deleteBook(){
        const { id } = this.props.match.params
        const url = `http://localhost:9000/book/deleteBook/${id}`;
        try {
        fetch(url, {
            method: "DELETE",
        }).then( res => res.json())
            .then( data => {
                if (data.success){
                    this.props.history.push("/")
                }
            });
        } catch (error) {
            throw error;
        }
    }

    componentDidMount() {
        this.getData()
    }

    render(){
        if (localStorage.userId === this.state.userId.toString()){
            return <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Title" key="1">
                            {this.state.title}
                        </TabPane>
                        <TabPane tab="Author" key="2">
                            {this.state.author}
                        </TabPane>
                        <TabPane tab="Genres" key="3">
                            {this.state.genres}
                        </TabPane>
                        <TabPane tab="Summary" key="4">
                            {this.state.summary}
                        </TabPane>
                    </Tabs>
                    <Button type="primary" danger style={{marginTop: 10}} onClick={this.deleteBook.bind(this)} >
                        Delete
                    </Button>
                </div>
        } else {
            return <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Title" key="1">
                            {this.state.title}
                        </TabPane>
                        <TabPane tab="Author" key="2">
                            {this.state.author}
                        </TabPane>
                        <TabPane tab="Genres" key="3">
                            {this.state.genres}
                        </TabPane>
                        <TabPane tab="Summary" key="4">
                            {this.state.summary}
                        </TabPane>
                    </Tabs>
                </div>
        }
    }
}

export default ShowBook;