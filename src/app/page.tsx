"use client";

import { useRef, useState } from "react";
import styles from "./Home.module.css";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const plane = useRef<HTMLDivElement>(null);
  const maxRotate = 45;
  const [audioSource, setAudioSource] = useState("https://radio.mascarata.space/listen/ivan/radio.mp3");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!plane.current) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const perspective = window.innerWidth * 4;
    const rotateX = maxRotate * x - maxRotate / 2;
    const rotateY = (maxRotate * y - maxRotate / 2) * -1;

    plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  };

  const changeAudioSource = (source: string) => {
    setAudioSource(source);
  };

  return (
    <div onMouseMove={handleMouseMove} className={styles.container}>
      <div ref={plane} className={styles.body}>
        <Text3d primary="rock" secondary="rock" onClick={() => changeAudioSource("https://radio.mascarata.space/listen/ivan/radio.mp3")} />
        <Text3d primary="electronic" secondary="electronic" onClick={() => changeAudioSource("https://radio.mascarata.space/listen/electronic/radio.mp3")} />
      </div>
      <div className="w-full absolute bottom-8 z-10"> {/* Измененный класс для растяжения на всю ширину */}
        <AudioPlayer source={audioSource} />
      </div>
    </div>
  );
}

function Text3d({ primary, secondary, onClick }: { primary: string; secondary: string; onClick: () => void }) {
  return (
    <div className={styles.textContainer} onClick={onClick}>
      <p className={styles.primary}>{primary}</p>
      <p className={styles.secondary}>{secondary}</p>
    </div>
  );
}
