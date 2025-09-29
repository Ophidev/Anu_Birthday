export default function FloatingHearts() {
  return (
    <div className="fixed right-4 bottom-8 z-20 flex flex-col gap-2">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-105">
        ↑
      </button>
      <div className="w-14 h-14 rounded-full bg-white/90 shadow p-2 flex items-center justify-center">
        <small className="text-pink-500 font-bold">❤</small>
      </div>
    </div>
  );
}
