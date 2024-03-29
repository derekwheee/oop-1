const T = require('prop-types');
const { useEffect, useCallback } = require('react');
const { default: Styled, ...S } = require('styled-components');

const internals = {};

module.exports = function Keyboard({ onKeydown, onKeyup }) {

    const { Container, Key, KeyRow } = internals;

    const playPhysicalKey = useCallback(({ key }) => {

        if (!(key in internals.physicalKeyMap)) {
            return;
        }

        const [note, octave] = internals.physicalKeyMap[key];

        onKeydown(note, octave);
    }, [onKeydown]);

    const stopPhysicalNote = useCallback(({ key }) => {

        if (!(key in internals.physicalKeyMap)) {
            return;
        }

        const [note, octave] = internals.physicalKeyMap[key];

        onKeyup(note, octave);
    }, [onKeyup]);

    useEffect(() => {

        document.addEventListener('keydown', playPhysicalKey);
        document.addEventListener('keyup', stopPhysicalNote);

        return () => {

            document.removeEventListener('keydown', playPhysicalKey);
            document.removeEventListener('keyup', stopPhysicalNote);
        };
    }, [playPhysicalKey, stopPhysicalNote]);

    return (
        <Container>
            <KeyRow>
                <Key $sharp note='F#' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='G#' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='A#' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='C#' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='D#' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='F#' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='G#' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='A#' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='C#' octave={3} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key $sharp note='D#' octave={3} onKeydown={onKeydown} onKeyup={onKeyup} />
            </KeyRow>
            <KeyRow>
                <Key note='F' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='G' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='A' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='B' octave={1} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='C' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='D' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='E' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='F' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='G' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='A' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='B' octave={2} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='C' octave={3} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='D' octave={3} onKeydown={onKeydown} onKeyup={onKeyup} />
                <Key note='E' octave={3} onKeydown={onKeydown} onKeyup={onKeyup} />
            </KeyRow>
        </Container>
    );
};

module.exports.propTypes = {
    onKeydown: T.func,
    onKeyup: T.func
};

module.exports.defaultProps = {
    onKeydown: () => {},
    onKeyup: () => {}
};

internals.physicalKeyMap = {
    'a': ['F', 0],
    'w': ['F#', 0],
    's': ['G', 0],
    'e': ['G#', 0],
    'd': ['A', 0],
    'r': ['A#', 0],
    'f': ['B', 0],
    'g': ['C', 1],
    'y': ['C#', 1],
    'h': ['D', 1],
    'u': ['D#', 1],
    'j': ['E', 1],
    'k': ['F', 1],
    'o': ['F#', 1],
    'l': ['G', 1],
    'p': ['G#', 1],
    ';': ['A', 1],
    '[': ['A#', 1],
    '\'': ['B', 1]
};

internals.Key = ({ $sharp, note, octave, onKeydown, onKeyup }) => {

    return (
        <internals.StyledKey
            $sharp={$sharp}
            onMouseDown={() => onKeydown(note, octave)}
            onMouseUp={() => onKeyup(note, octave)}
            onMouseLeave={() => onKeyup(note, octave)}
        />
    );
};

internals.Key.propTypes = {
    $sharp: T.bool,
    note: T.string,
    octave: T.number,
    onKeydown: T.func,
    onKeyup: T.func
};

internals.Container = Styled.div`
    padding: 2px;
    background: #111;
`;

internals.KeyRow = Styled.div`
    display: flex;
`;

internals.StyledKey = Styled.div`
    position: relative;
    flex-basis: 100%;
    height: 200px;
    margin: 2px;
    background: #ccc;
    border-radius: 8px;

    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: calc(100% - 32px);
        background: #aaa;
        transform: translate(-50%, -50%);
        border-radius: 200px;
    }

    ${({ $sharp }) => {

        return $sharp && S.css`
            height: 75px;

            &:after {
                width: auto;
                height: 50px;
                aspect-ratio: 1;
                background: #333;
            }

            &:nth-child(5n - 4):after,
            &:nth-child(5n - 1):after {
                transform: translate(-25%, -50%);
            }

            &:nth-child(5n - 2):after,
            &:nth-child(5n - 0):after {
                transform: translate(-75%, -50%);
            }
        `;
    }}
`;
