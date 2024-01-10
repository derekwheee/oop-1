const { useState } = require('react');
const HomePage = require('../components/HomePage');
const { FREQUENCY } = require('../../../utils/constants');

const internals = {};

module.exports = function HomePageContainer() {

    const [audioContext, setAudioContext] = useState(null);

    const handleInitialize = () => {

        setAudioContext(internals.initialize());
    };

    return (
        <HomePage
            onInitialize={handleInitialize}
            audioContext={audioContext}
            onKeydown={audioContext?.playTone}
            onKeyup={audioContext?.stopTone}
        />
    );
};

internals.initialize = () => {

    const context = new AudioContext();
    const envelopes = Array(1).fill().map((_, i) => {

        const oscillator = new OscillatorNode(context, {
            frequency: 100,
            type: 'sine'
        });
        const gainNode = new GainNode(context);

        oscillator.connect(gainNode).connect(context.destination);
        gainNode.gain.setValueAtTime(0, context.currentTime);
        oscillator.start();

        return { oscillator, gainNode, gain: gainNode.gain, lastUsedNote: null, lastUsedTime: null };
    });


    return {
        context,
        envelopes,
        playTone(note, octave, time, attack = 0.1) {

            const envelope = envelopes.sort(internals.sortByLastUsed)[0];
            const frequency = FREQUENCY[note] * (2 ** (Number(octave) - 1));

            time = time || context.currentTime;

            envelope.lastUsedNote = [note, octave];
            envelope.lastUsedTime = time;
            envelope.oscillator.frequency.value = frequency;
            envelope.gain.cancelScheduledValues(time);
            envelope.gain.setValueAtTime(0, time);
            envelope.gain.linearRampToValueAtTime(1, time + attack);
        },
        stopTone(note, octave, time, release = 0.1) {

            const envelope = envelopes.find(({ lastUsedNote }) => lastUsedNote?.[0] === note && lastUsedNote?.[1] === octave);

            time = time || context.currentTime;

            envelope?.gain.linearRampToValueAtTime(0, time + release);
        }
    };
};

internals.sortByLastUsed = (a, b) => {

    if (a.lastUsed < b.lastUsed) {
        return -1;
    }

    if (a.lastUsed > b.lastUsed) {
        return 1;
    }

    return 0;
};

internals.playNote = ({ gain, oscillator, frequency } = {}) => {

    if (!gain || gain.gain.value === 100) {
        return;
    }

    gain.gain.value = 100;

    oscillator.type = 'sawtooth';

    oscillator.frequency.value = frequency;

    try {
        oscillator.start();
    }
    catch (err) {
        // no-op
    }
};
