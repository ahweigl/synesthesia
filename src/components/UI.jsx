import { atom, useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: "Prelude-1",
  },
  {
    front: "Prelude-2",
    back: "blank",
  },
  {
    front: "Poem-3-1",
    back: "Poem-3-3",
  },
  {
    front: "Poem-3-2",
    back: "blank",
  },
  {
    front: "Poem-1-1",
    back: "Poem-1-3",
  },
  {
    front: "Poem-1-2",
    back: "Poem-2-1",
  },
  {
    front: "Poem-2-2",
    back: "book-back",
  },
];

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  useEffect(() => {
    // Cleanup audio when component unmounts or page changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [page]);

  const handlePlayPause = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio.mp4");
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <div className="pointer-events-auto mt-10 ml-10 mr-10 flex items-center justify-between">
          <div className="font-italiana text-black text-4xl leading-tight" style={{ fontFamily: '"Italiana", serif', fontWeight: 500 }}>
            Angela Weigl
          </div>
          <button
            onClick={() => setShowInstructions(true)}
            className="w-6 h-6 rounded-full border border-black/30 bg-[#faf8f3]/80 hover:bg-[#faf8f3]/90 flex items-center justify-center text-black/70 hover:text-black transition-all duration-200 grainy-button"
            aria-label="Show instructions"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {/* Front Cover */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${0 === page
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(0)}
            >
              Initium
            </button>
            {/* Page 1 */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${1 === page
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(1)}
            >
              Prelude
            </button>
            {/* Page 2 */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${2 === page
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(2)}
            >
              I.
            </button>
            {/* Page 4 */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${4 === page
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(4)}
            >
              II.
            </button>
            {/* Page 6 */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${6 === page
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(6)}
            >
              III.
            </button>
            {/* Back Cover */}
            <button
              className={`grainy-button font-garamond border-black/30 hover:border-black/50 transition-all duration-300 px-5 py-2.5 rounded-full text-base normal-case shrink-0 border relative ${page === pages.length
                ? "bg-black/85 text-white"
                : "bg-[#faf8f3]/80 text-black/80 hover:bg-[#faf8f3]/90 backdrop-blur-sm"
                }`}
              style={{ fontFamily: '"EB Garamond", serif' }}
              onClick={() => setPage(pages.length)}
            >
              Finis
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 hidden items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll hidden items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-black/20 text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-black/15 text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-black/20 text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-black/18 text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-black/15 text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-black/20 text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-black/20 text-10xl font-black ">
              Wawa Sensei
            </h1>
            <h2 className="shrink-0 text-black/15 text-8xl italic font-light">
              React Three Fiber
            </h2>
            <h2 className="shrink-0 text-black/20 text-12xl font-bold">
              Three.js
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Ultimate Guide
            </h2>
            <h2 className="shrink-0 text-black/18 text-9xl font-medium">
              Tutorials
            </h2>
            <h2 className="shrink-0 text-black/15 text-9xl font-extralight italic">
              Learn
            </h2>
            <h2 className="shrink-0 text-black/20 text-13xl font-bold">
              Practice
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Creative
            </h2>
          </div>
        </div>
      </div>

      {/* Play button for page 4 and page 5 */}
      {(page === 4 || page === 5) && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
          <button
            onClick={handlePlayPause}
            className="pointer-events-auto w-20 h-20 rounded-full bg-black/80 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
          onClick={() => setShowInstructions(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-[#faf8f3] border border-black/20 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto grainy-button"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Close button */}
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black/60 hover:text-black transition-colors"
                aria-label="Close instructions"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content area - user will fill this in */}
              <div className="font-garamond text-black" style={{ fontFamily: '"EB Garamond", serif' }}>
                <h2 className="text-3xl font-semibold mb-2">Final Folio, Fall 2025</h2>
                <h3 className="text-xl italic mb-4">HONR 3310: Found Poetry Workshop</h3>
                <div className="space-y-3 text-lg leading-relaxed mt-6">
                  <div className="mb-4">
                    <p className="text-black/80">Use the  button at the bottom to jump between sections.</p>
                    <p className="text-black/80">Click and drag with your mouse to rotate and move the folio in 3D.</p>
                    <p className="text-black/80">Click on pages to turn them forward or backward.</p>
                    <p className="text-black/80">Scroll up to zoom in, scroll down to zoom out.</p>
                    <p className="text-black/60 text-sm mt-6 italic">
                      Built using React, Three.js, React Three Fiber, and Tailwind CSS, and the help of  {" "}
                      <a
                        href="https://youtu.be/b7a_Y1Ja6js?si=L8406wun_bC5tKc-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black/80 transition-colors"
                      >
                        Wawa Sensei's tutorial
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
