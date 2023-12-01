const { Suspense } = require('react');
const T = require('prop-types');
const ErrorFallback = require('./ErrorFallback');
const LoadingFallback = require('./LoadingFallback');
const { default: Styled } = require('styled-components');
const { ErrorBoundary } = require('react-error-boundary');

const internals = {};

module.exports = ({ children, location }) => {

    const { AppContainer } = internals;

    return (
        <AppContainer>
            <ErrorBoundary key={location.key} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingFallback />}>
                    {children}
                </Suspense>
            </ErrorBoundary>
        </AppContainer>
    );
};

module.exports.propTypes = {
    children: T.any,
    location: T.shape({
        key: T.string
    })
};

internals.AppContainer = Styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;
