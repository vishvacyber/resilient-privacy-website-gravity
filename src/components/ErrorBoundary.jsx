import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details (in production, send to logging service)
        console.error('Error Boundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // In production, you would send this to an error tracking service
        // Example: logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <div className="error-card">
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem'
                        }}>
                            <AlertTriangle size={40} color="#ef4444" />
                        </div>

                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            marginBottom: '1rem'
                        }}>
                            Oops! Something went wrong
                        </h1>

                        <p style={{
                            color: 'var(--text-muted)',
                            marginBottom: '2rem',
                            lineHeight: '1.6'
                        }}>
                            We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={{
                                background: 'var(--bg-dark)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '2rem',
                                textAlign: 'left'
                            }}>
                                <summary style={{
                                    color: 'var(--text-main)',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    Error Details (Development Only)
                                </summary>
                                <pre style={{
                                    color: '#ef4444',
                                    fontSize: '0.875rem',
                                    overflow: 'auto',
                                    marginTop: '1rem'
                                }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                variant="outline"
                                onClick={this.handleReset}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <RefreshCw size={18} />
                                Try Again
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.handleGoHome}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Home size={18} />
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
