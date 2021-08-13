import { Component } from 'react';
import PropTypes from 'prop-types';
import sha256 from 'crypto-js/sha256';
import 'antd/dist/antd.css';
import { Space, Form, Input, Button } from 'antd';

class SignIn extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  static defaultProps = {
    username: 'username',
    password: 'password',
  }

  constructor(props) {
    super(props);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = {
        username: '',
        password: '',
    }
  }

  onUsernameChange(event) {
    this.setState({
        username: event.target.value,
    });
    }
  
  onPasswordChange(event) {
    this.setState({
        password: event.target.value,
    });
  }

  login(username, password) {
    const logininfo = {"username": username,
                      "password": sha256(password).toString()}
    const url = " http://localhost:9000/user/signin";
    try {
      fetch(url, {
        method: "POST",
        headers: {
            "Content-type":"application/json;charset=utf-8",
        },
        body: JSON.stringify(logininfo),
      }).then( res => res.json())
        .then( data => {
          if (data.success){
            localStorage.setItem('userData', JSON.stringify(logininfo));
            localStorage.setItem('userId', data.userId);
            this.props.history.push("/")
          } else {
            window.alert("Login Fall")
          }
        });
    } catch (error) {
        throw error;
    }
  }
 
  render() {
    const { username, password } = this.state;
    return (
      <div className="signup">
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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              onChange={ this.onUsernameChange }
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              onChange={ this.onPasswordChange }
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={this.login.bind(this, username, password)}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    );
  }
}

export default SignIn;