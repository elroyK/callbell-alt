import React from 'react';
import { node } from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError : false,
            error    : null,
        };
    }

    static getDerivedStateFromError() {
        return { hasError : true };
    }

    componentDidCatch(error, info) {
        console.log('Erreur: ');
        console.log(error);
        console.log(info);

        this.setState({
            error : error.message,
        });
    }

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;

        return (
            hasError
                ? (
                    <>
                        <h1>Error</h1>
                        <p>{error?.message}</p>
                    </>
                )
                : children
        );
    }
}

ErrorBoundary.propTypes = {
    children : node.isRequired,
};

export default ErrorBoundary;
