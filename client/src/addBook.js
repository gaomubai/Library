import { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Space, Form, Input, Button } from 'antd';

const { TextArea } = Input;

class AddBook extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        summary: PropTypes.string,
        genres: PropTypes.string.isRequired,
    }

    static defaultProps = {
        title: 'title',
        author: 'author',
        summary: 'summary',
        genres: 'genres'
    }

    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onSummaryChange = this.onSummaryChange.bind(this);
        this.onGenresChange = this.onGenresChange.bind(this);
        this.state = {
            title: 'title',
            author: 'author',
            summary: 'summary',
            genres: 'genres',
        };
    }

    onTitleChange(event) {
        this.setState({
            title: event.target.value,
        });
    }
    
    onAuthorChange(event) {
        this.setState({
            author: event.target.value,
        });
    }

    onGenresChange(event) {
        this.setState({
            genres: event.target.value,
        });
    }

    onSummaryChange(event) {
        this.setState({
            summary: event.target.value,
        });
    }

    addBook(title, author, genres, summary, id) {
        const bookInfo = {"title": title,
                            "author": author,
                            "genres": genres,
                            "summary": summary,
                            "id": id}
        const url = "http://localhost:9000/book/add";
        try {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(bookInfo),
        }).then(res => res.json())
            .then(data => {
                if (data.success){
                    this.props.history.push("/")
                }else {
                    window.alert("Book Adding Fall")
                }
            });
        } catch (error) {
            throw error;
        }
    }

    render() {
        const { title, author, genres, summary } = this.state;
        return (
            <div className="addBook">
                <Space>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                >
                    <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your book title!',
                        },
                    ]}
                    onChange={ this.onTitleChange }
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        {
                        required: true,
                        message: 'Please input book author!',
                        },
                    ]}
                    onChange={ this.onAuthorChange }
                    >
                    <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Genres"
                    name="genres"
                    rules={[
                        {
                        required: true,
                        message: 'Please input book genres!',
                        },
                    ]}
                    onChange={ this.onGenresChange }
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Summary"
                    name="summary"
                    rules={[
                        {
                        required: true,
                        message: 'Please input summary!',
                        },
                    ]}
                    onChange={ this.onSummaryChange }
                    >
                    <TextArea rows={4} />
                    </Form.Item> 
                    
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.addBook.bind(this, title, author, genres, summary, localStorage.getItem("userId"))}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Space>
            </div>
        );
    }
}

export default AddBook;
