import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ShareButton from "./components/ShareButton";
import FloatingHearts from "./components/FloatingHearts";
import BirthdayGiftApp from "./components/BirthdayGiftApp";
import BirthdayRoadmapComponent from "./components/BirthdayRoadmapComponent";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const photos = Array.from({ length: 20 }).map((_, i) => `/photos/photo${i + 1}.jpg`);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });

      gsap.utils.toArray(".timeline-card").forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function toggleZoomImage(idx) {
    window.open(`/photos/photo${idx + 1}.jpg`, "_blank");
  }

  function getCaptionForIndex(i) {
    const captions = [
      "The beginning — shy smiles",
      "Little adventures together",
      "School time mischief",
      "That unforgettable trip",
      "Laughter that never ends",
      "The best selfie",
      "Dancing in the rain",
      "Late night talks",
      "Coffee & study dates",
      "Silly faces",
      "First festival together",
      "Dreaming big",
      "Our small victories",
      "When we couldn't stop laughing",
      "Sunsets & secrets",
      "A gentle moment",
      "Making memories",
      "Inside jokes",
      "Always together",
      "Today — celebrate!",
    ];
    return captions[i] || "Beautiful memory";
  }

  function getSubtextForIndex(i) {
    const subs = [
      "Where everything started.",
      "Exploring the little wonders.",
      "Young and fearless.",
      "A trip we'll always remember.",
      "You made every day brighter.",
      "A selfie to freeze the moment.",
      "Because the rain felt like magic.",
      "When the world felt close.",
      "Warm drinks and warmer talks.",
      "Silly, loud and full of life.",
      "Colors of celebration.",
      "Plans, dreams and giggles.",
      "Steps toward bigger things.",
      "We laughed until it hurt.",
      "Golden hour memories.",
      "Quiet and beautiful.",
      "Snapshots of joy.",
      "Words only we understand.",
      "Side by side, always.",
      "Your special day — shine!",
    ];
    return subs[i] || "A moment to remember.";
  }

  return (
   <BirthdayRoadmapComponent/>
  );
}
