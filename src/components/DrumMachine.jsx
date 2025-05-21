import React, { useEffect } from "react";
import { useState } from "react";

const DrumMachine = () => {

    const drumPads = [
        {
            key: "Q",
            id: "Heater 1",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        },
        {
            key: "W",
            id: "Heater 2",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        },
        {
            key: "E",
            id: "Heater 3",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        },
        {
            key: "A",
            id: "Heater 4",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        },
        {
            key: "S",
            id: "Clap",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        },
        {
            key: "D",
            id: "Open HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        },
        {
            key: "Z",
            id: "Kick n' Hat",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        },
        {
            key: "X",
            id: "Kick",
            src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        },
        {
            key: "C",
            id: "Closed HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        },
    ];

    const drumPadsBank = [
        {
            key: "Q",
            id: "Chord 1",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        },
        {
            key: "W",
            id: "Chord 2",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        },
        {
            key: "E",
            id: "Chord 3",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        },
        {
            key: "A",
            id: "Shaker",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        },
        {
            key: "S",
            id: "Open HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        },
        {
            key: "D",
            id: "Closed HH",
            src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        },
        {
            key: "Z",
            id: "Punchy Kick",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
        },
        {
            key: "X",
            id: "Side Kick",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        },
        {
            key: "C",
            id: "Snare",
            src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        },
    ];

    const [isOn, setIsOn] = useState(false);
    const [isOnBank, setIsOnBank] = useState(false);
    const [activeKey, setActiveKey] = useState(null);
    const [volume, setVolume] = useState(0.5);

    const toggleSwitchBank = () => {
        setIsOnBank((prevState) => !prevState);
    };

    const toggleSwitch = () => {
        setIsOn((prevState) => !prevState);
    };
    const [display, setDisplay] = useState("");
    const drums = isOnBank ? drumPadsBank : drumPads;

    const playSound = (key) => {
        if (!isOn) return;

        const audio = document.getElementById(key);
        if (audio) {
            audio.volume = volume; // ← aplica volumen actual
            audio.currentTime = 0;
            audio.play();
            const pad = drums.find((p) => p.key === key);
            setDisplay(pad ? pad.id : "");
            setActiveKey(key);
            setTimeout(() => {
                setActiveKey(null);
            }, 150);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toUpperCase();
            if (isOn && drums.some((p) => p.key === key)) {
                playSound(key);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOn, drums]);

    return (
        <div id="drum-machine">
            <div id="display">
                {drums.map((pad) => (
                    <button
                        className={`drum-pad ${activeKey === pad.key ? "active" : ""}`}
                        id={pad.id}
                        key={pad.key}
                        onClick={() => playSound(pad.key)}
                    // Desactiva los botones si el Power está apagado
                    >
                        {pad.key}
                        <audio className="clip" id={pad.key} src={pad.src}></audio>
                    </button>
                ))}
            </div>
            <div className="master">
                <div id="power">
                    <span>Power</span>
                    <div className="switch-container" onClick={toggleSwitch}>
                        <div className={`switch-track ${isOn ? "on" : "off"}`}>
                            <div className="switch-thumb" />
                        </div>
                    </div>
                </div>
                <p id="name-sample">&nbsp;{display}</p>
                <div id="volume">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="slider"
                    />
                </div>
                <div id="power">
                    <span>Bank</span>
                    <div className="switch-container" onClick={toggleSwitchBank}>
                        <div className={`switch-track ${isOnBank ? "on" : "off"}`}>
                            <div className="switch-thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrumMachine;
