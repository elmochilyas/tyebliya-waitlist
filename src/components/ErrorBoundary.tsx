'use client';

import React, { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('ErrorBoundary caught:', error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <section className="py-16 text-center">
                        <p className="text-secondary/40 text-sm">Something went wrong. Please refresh the page.</p>
                    </section>
                )
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
