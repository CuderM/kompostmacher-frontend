import React  from "react";
import { toast } from "react-toastify";
import App from '../App';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state to trigger fallback UI
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Log error or send logging data to log management tool
      toast.error(errorInfo)
      console.log('u are a little nigga ', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Render fallback UI
        return <App isError={true}/>;
      }
  
      return this.props.children; 
    }
  }