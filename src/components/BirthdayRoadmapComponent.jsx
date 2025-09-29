import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------
// NodeRow Component (memoized)
// -----------------------------
const NodeRow = React.memo(function NodeRow({ node, openNode, setOpenNode, photos, openGallery, isLast }) {
  if (node.type === "hero") {
    return (
      <div className="w-full flex justify-center relative z-10">
        <div className="w-full max-w-md px-4 py-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6 py-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-700 mb-4">
              🎉 Happy Birthday, Anushka! 🎂
            </h1>
            <p className="text-lg sm:text-xl text-pink-700 font-semibold mb-2">
              A special journey of surprises awaits you! 💖
            </p>
            <p className="text-md sm:text-lg text-pink-600 mb-2">
              Wishing you endless smiles, laughter, and magical moments today! ✨
            </p>
            <p className="text-md sm:text-lg text-pink-600 mb-2">
              May your day be filled with love, joy, and all the things you adore! 💐
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (node.type === "photo" || node.type === "big") {
    return (
      <div className="w-full flex flex-col items-center relative">
        {/* Roadmap Dot & Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0 pointer-events-none">
          <div
            className={`${
              node.type === "big" ? "w-4 h-4" : "w-3 h-3"
            } rounded-full bg-black/40 z-10`} // changed to light black
          />
          {!isLast && (
            <div className="flex flex-col items-center mt-1 mb-1">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 bg-black/20 rounded-full my-1" // light black line
                />
              ))}
            </div>
          )}
        </div>

        {openNode === node.id && node.type === "photo" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xs z-10"
          >
            <img
              src={photos[node.index]}
              alt={`photo-${node.index}`}
              className="w-full max-h-[65vh] sm:max-h-[75vh] object-contain rounded-xl shadow-2xl bg-white"
            />
            <div className="mt-2 flex justify-center">
              <button
                onClick={() => setOpenNode(null)}
                className="px-4 py-2 rounded bg-pink-50 text-pink-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              node.type === "photo"
                ? setOpenNode(node.id)
                : openGallery()
            }
            className={`${
              node.type === "big"
                ? "w-56 h-56 sm:w-60 sm:h-60 bg-gradient-to-br from-pink-600 to-purple-600 text-4xl sm:text-5xl"
                : "w-20 h-20 sm:w-24 sm:h-24 bg-pink-500 text-2xl sm:text-3xl"
            } rounded-xl shadow-lg flex items-center justify-center text-white cursor-pointer z-10`}
          >
            🎁
          </motion.div>
        )}
      </div>
    );
  }

  if (node.type === "end") {
    return (
      <div className="w-full flex justify-center relative z-10 mt-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 py-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-3">
            🌟 Wishing You a Bright Future! 🌟
          </h2>
          <p className="text-md sm:text-lg text-pink-600 mb-2">
            May your life be filled with love, happiness, and endless opportunities! 💖
          </p>
          <p className="text-md sm:text-lg text-pink-600">
            Keep shining and chasing your dreams. The best is yet to come! <p className="text-black">And ab Thank you bola to maar padegi😒</p>
          </p>
        </motion.div>
      </div>
    );
  }

  return null;
});

// -----------------------------
// Main Component
// -----------------------------
export default function BirthdayRoadmapComponent() {
  const photos = useMemo(
    () => Array.from({ length: 16 }, (_, i) => `/photos/photo${i + 1}.jpg`),
    []
  );

  const nodes = useMemo(
    () => [
      { id: "hero", type: "hero" },
      ...photos.map((_, i) => ({
        id: `p-${i}`,
        type: "photo",
        index: i,
      })), // all photos are nodes now
      { id: "big", type: "big" },
      { id: "end", type: "end" },
    ],
    [photos]
  );

  const [openNode, setOpenNode] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress for background
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h =
            document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(
            h <= 0 ? 0 : Math.min(1, window.scrollY / h)
          );
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Background gradient lerp
  const lerp = (a, b, t) => Math.round(a + (b - a) * t);
  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16),
    ];
  };
  const lerpColor = (c1, c2, t) => {
    const a = hexToRgb(c1),
      b = hexToRgb(c2);
    return `rgb(${lerp(a[0], b[0], t)}, ${lerp(a[1], b[1], t)}, ${lerp(
      a[2],
      b[2],
      t
    )})`;
  };

  const bgTop = lerpColor("#FFF7FB", "#FFDEE9", scrollProgress);
  const bgBottom = lerpColor("#FFE6F0", "#FDEDFB", scrollProgress);

  // Floating emojis + butterflies
  const floatingItems = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 6,
        dur: 10 + Math.random() * 10,
        size: 14 + Math.random() * 20,
        emoji:
          Math.random() > 0.7
            ? "🦋"
            : Math.random() > 0.5
            ? "❤️"
            : Math.random() > 0.5
            ? "🌹"
            : "🎈",
      })),
    []
  );

  const openGallery = useCallback(() => setGalleryOpen(true), []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, ${bgTop}, ${bgBottom})`,
      }}
      className="relative min-h-screen overflow-x-hidden"
    >
      {/* Floating Emojis and Butterflies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            style={{ left: `${item.left}%`, fontSize: item.size }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-20vh", opacity: [1, 0.2] }}
            transition={{
              duration: item.dur,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Audio */}
      <audio ref={audioRef} src="/audio/videoplayback.weba" loop />
      <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 z-50 flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow">
        <button
          onClick={toggleAudio}
          className="px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-pink-500 text-white text-xs sm:text-base"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="text-xs sm:text-sm text-pink-700">Music</div>
      </div>

      {/* Nodes */}
      <div className="relative z-10 max-w-full sm:max-w-xs mx-auto py-6 flex flex-col items-center space-y-6">
        {nodes.map((node, i) => (
          <NodeRow
            key={node.id}
            node={node}
            openNode={openNode}
            setOpenNode={setOpenNode}
            photos={photos}
            openGallery={openGallery}
            isLast={i === nodes.length - 1}
          />
        ))}
      </div>

      {/* Gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto p-6"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">All Gifts — Gallery</h3>
                <button
                  onClick={() => setGalleryOpen(false)}
                  className="px-4 py-2 rounded bg-pink-100 text-pink-700"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {photos.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    alt={`g-${i}`}
                    className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-lg"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
