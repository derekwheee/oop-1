const { useState } = require('react');
const HomePage = require('../components/HomePage');

const internals = {};

module.exports = function HomePageContainer() {

    const [audioContext, setAudioContext] = useState(null);

    const handleInitialize = () => {

        setAudioContext(internals.initialize());
    };

    return <HomePage onInitialize={handleInitialize} audioContext={audioContext} />;
};

// const internals = {};

internals.initialize = () => {

    const context = new AudioContext();

    return {
        context,
        playTone(time = context.currentTime, attack = 0.1, duration = 1, release = 0.1) {

            const oscillator = new OscillatorNode(context, {
                frequency: 100,
                type: 'sine'
            });

            const envelope = new GainNode(context);
            envelope.gain.cancelScheduledValues(time);
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(1, time + attack);
            envelope.gain.linearRampToValueAtTime(0, time + duration - release);

            oscillator.connect(envelope).connect(context.destination);
            oscillator.start(time);
            oscillator.stop(time + duration);
        }
    };
};
