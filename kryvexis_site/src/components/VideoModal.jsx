"use client";
import { AnimatePresence, motion } from "./Motion";
import { X } from "lucide-react";

export default function VideoModal({ open, onClose, youtubeId="dQw4w9WgXcQ" }){
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] modal-backdrop grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass w-full max-w-4xl rounded-2xl overflow-hidden shadow-glow border-white/15"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-sm font-semibold">Kryvexis OS • 60-sec demo</div>
              <button className="btn-secondary px-3 py-2" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="Kryvexis demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
