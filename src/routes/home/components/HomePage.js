const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const Keyboard = require('../../../components/Keyboard');
const { default: ToggleButtonGroup } = require('@mui/material/ToggleButtonGroup');
const { default: ToggleButton } = require('@mui/material/ToggleButton');

const internals = {};

module.exports = ({ audioContext, onInitialize, onKeydown, onKeyup }) => {

    const { Container, ControlBar, PowerSwitch, PowerSwitchButton } = internals;

    return (
        <Container>
            <ControlBar>
                <PowerSwitch
                    value={!!audioContext}
                    exclusive
                    onChange={onInitialize}
                >
                    <PowerSwitchButton disableRipple value={false}>
                        OFF
                    </PowerSwitchButton>
                    <PowerSwitchButton disableRipple value={true}>
                        ON
                    </PowerSwitchButton>
                </PowerSwitch>
            </ControlBar>
            <Keyboard
                onKeydown={onKeydown}
                onKeyup={onKeyup}
            />
        </Container>
    );
};

module.exports.propTypes = {
    audioContext: T.object,
    onInitialize: T.func.isRequired,
    onKeydown: T.func,
    onKeyup: T.func
};

internals.Container = Styled.div`
    width: 100%;
    align-self: center;
    margin: auto;
    background: #666;
`;

internals.WelcomeMessage = Styled(Typography).attrs({ variant: 'h4', align: 'center' })`

    // Example leveraging the mui theme from inside a styled-component
    color: ${({ theme }) => theme.palette.secondary.main};
`;

internals.ControlBar = Styled.div`
    padding: 10px;
    background: #ccc;
`;

internals.PowerSwitch = Styled(ToggleButtonGroup)`
    border-radius: 25px;    
    background: #999;
`;

internals.PowerSwitchButton = Styled(ToggleButton)`
    width: 50px;
    height: 50px;
    border: 0;
    background: #999;
    transition: all 0.3s ease-in-out;

    &:first-child {
        border-radius: 25px 0 0 25px;
        background: #999;

        &.Mui-selected {
            width: 100px;
            border-radius: 25px;
            background: #e33;
            font-weight: bold;
            color: #500;
        }
    }

    &:last-child {
        border-radius: 0 25px 25px 0;
        background: #999;

        &.Mui-selected {
            width: 100px;
            border-radius: 25px;
            background: #6e6;
            font-weight: bold;
            color: #070;
        }
    }
`;
