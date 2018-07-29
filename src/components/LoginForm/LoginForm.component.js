import React, { Component } from 'react';
import './LoginForm.component.css';

class LoginForm extends Component {

onSignin = event => {
  event.preventDefault();
  const email = event.target.querySelector('[name=email]').value;
  const password = event.target.querySelector('[name=password]').value;
  this.props.onSignin(email, password);
}

render() {

  return (
    <div>

      <div id="login-container" className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div id="head-login">
                    Enter you email and password:
                  </div>
                </div>
                <hr></hr>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <form id="login-form" onSubmit={this.onSignin} >

                      <div className="form-group">
                        <input type="text" name="email" id="email"  className="form-control" placeholder="Email"  />
                      </div>
                      <div className="form-group">
                        <input type="password" name="password" id="password"  className="form-control" placeholder="Password" />
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="login-submit" id="login-submit"  className="form-control btn btn-primary" value="Log In" />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div id="error-login--message" className="error-login--hide">
                          Enter you email and password,please!!!
                        </div>
                      </div>	

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

}

export default LoginForm;
