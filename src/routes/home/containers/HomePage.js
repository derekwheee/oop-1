const { useState, useCallback } = require('react');
const HomePage = require('../components/HomePage');
const { FREQUENCY } = require('../../../utils/constants');

const internals = {};

module.exports = function HomePageContainer() {

    const [audioContext, setAudioContext] = useState(null);
    const [envelopes, setEnvelopes] = useState({});

    const handleInitialize = () => {

        setAudioContext(new AudioContext());
    };

    const playTone = useCallback((note, octave, time, attack = 0.1) => {

        if (!audioContext) {
            return;
        }

        let envelope;

        if (`${note}${octave}` in envelopes) {
            envelope = envelopes[`${note}${octave}`];
        }
        else {
            const oscillator = new OscillatorNode(audioContext, {
                frequency: FREQUENCY[note] * (2 ** (Number(octave) - 1)),
                type: 'sine'
            });
            const gainNode = new GainNode(audioContext);

            oscillator.connect(gainNode).connect(audioContext.destination);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            oscillator.start();

            envelope = {
                oscillator,
                gainNode,
                gain: gainNode.gain
            };
        }

        time = time || audioContext.currentTime;

        envelope.gain.cancelScheduledValues(time);

        if (envelope.gain.value === 0) {
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(0.5, time + attack);
        }

        setEnvelopes({
            ...envelopes,
            [`${note}${octave}`]: envelope
        });

    }, [audioContext, envelopes]);

    const stopTone = useCallback((note, octave, time, release = 0.1) => {

        if (!audioContext) {
            return;
        }

        const envelope = envelopes[`${note}${octave}`];

        if (!envelope) {
            return;
        }

        time = time || audioContext.currentTime;

        envelope.gain.linearRampToValueAtTime(0, time + release);
    }, [audioContext, envelopes]);

    return (
        <HomePage
            onInitialize={handleInitialize}
            audioContext={audioContext}
            onKeydown={playTone}
            onKeyup={stopTone}
        />
    );
};
