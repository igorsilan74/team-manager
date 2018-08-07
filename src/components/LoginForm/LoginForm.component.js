import React, { Component } from 'react';
import './LoginForm.component.css';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {	  
        email:'',
        password:''
	  }
    }

  }	

onSignin = event => {
  event.preventDefault();
  const { email, password } = this.state.form;
  this.props.onSignin(email, password);
}

handleChange = e => {
  const { name, value } = e.target;
	
  this.setState( prevState => ({
    form: {
      ...prevState.form,
      [name]: value,
    }
  }));

};

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
                        <input type="text" name="email" id="email"  className="form-control" placeholder="Email" value={this.state.form.email} onChange={this.handleChange}  />
                      </div>
                      <div className="form-group">
                        <input type="password" name="password" id="password"  className="form-control" placeholder="Password" value={this.state.form.password} onChange={this.handleChange} />
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
