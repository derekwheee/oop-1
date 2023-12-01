const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: Button } = require('@mui/material/Button');

const internals = {};

module.exports = ({ audioContext, onInitialize }) => {

    const { Container } = internals;

    const isReady = !!audioContext;

    return (
        <Container>
            <Button variant='contained' onClick={onInitialize}>Power</Button>
            <Button variant='contained' disabled={!isReady} onClick={() => audioContext.playTone()}>Play</Button>
        </Container>
    );
};

module.exports.propTypes = {
    audioContext: T.object,
    onInitialize: T.func.isRequired
};

internals.Container = Styled.div`
    align-self: center;
    margin: auto;
`;

internals.WelcomeMessage = Styled(Typography).attrs({ variant: 'h4', align: 'center' })`

    // Example leveraging the mui theme from inside a styled-component
    color: ${({ theme }) => theme.palette.secondary.main};
`;
