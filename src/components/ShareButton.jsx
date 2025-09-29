export default function ShareButton({ photoSrc }) {
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Happy Birthday!", text: "Look at this memory!", url: window.location.href }); } 
      catch {}
    } else {
      try { await navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } 
      catch { alert("Sharing not supported"); }
    }
  };
  return <button onClick={handleShare} className="px-3 py-1 rounded-full bg-white border text-sm shadow-sm">Share</button>;
}
