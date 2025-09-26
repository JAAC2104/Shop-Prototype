// Hero.tsx
import { useEffect, useState, useRef } from "react";

type Slide = {
  id: number;
  image: string;
  title: string;
  description?: string;
};

const slides: Slide[] = [
  { id: 1, image: "https://picsum.photos/1800/400?random=1", title: "Special Promo", description: "Enjoy limited-time discounts." },
  { id: 2, image: "https://picsum.photos/1800/400?random=2", title: "New Colection", description: "The latest trends for you." },
  { id: 3, image: "https://picsum.photos/1800/400?random=3", title: "Free Shippping", description: "On orders over $50." },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    start();
    return stop;
  }, []);

  function start() {
    stop();
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  }
  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const goTo = (i: number) => setCurrent(i);

  return (
    <section
      className="w-full flex justify-center px-3 sm:px-4 md:px-6 mt-10"
      aria-label="Promociones destacadas"
    >
      <div
        className="
          relative w-full max-w-[1800px]
          h-[140px] sm:h-[180px] md:h-[220px] lg:h-[300px] xl:h-[400px]
          overflow-hidden rounded-lg shadow-lg
        "
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== current}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
            <div
              className="
                absolute inset-0 flex flex-col items-center justify-center
                text-white text-center px-4
              "
            >
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl drop-shadow">
                {slide.title}
              </h2>
              {slide.description && (
                <p className="mt-1 text-xs sm:text-sm md:text-base xl:text-lg max-w-3xl drop-shadow">
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition
                ${current === i ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
