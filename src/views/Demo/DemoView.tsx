import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, message } from 'antd';
import { login, signOut } from '../../actions/DemoAction';
import ContentWrapper from '../../components/Layout/ContentWrapper';

class DemoView extends Component<any, any> {
  login = async () => {
    await this.props.login({ email: '', password: '' });

    this.props.state.demo.isAuthenticated ? message.success('Login Success', 2) : null;
  };

  logout = async () => {
    await this.props.signOut();

    !this.props.state.demo.isAuthenticated ? message.warn('Logout Success', 2) : null;
  };

  render() {
    return (
      <ContentWrapper>
        <Result
          status="success"
          title="Successfully! Redux Form Page"
          subTitle="You can open the console and check your data. Press F12...."
        />
      </ContentWrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps, { login, signOut })(DemoView);
