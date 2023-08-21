import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      myError:''
    };
  }


  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error)
    this.setState({myError:error[0]})
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>{this.state.myError}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;