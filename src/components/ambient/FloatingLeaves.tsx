import { useMemo } from "react";

type Leaf = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
};

export default function FloatingLeaves() {
  const leaves = useMemo<Leaf[]>(
    () => [
      {
        id: 1,
        left: "8%",
        size: 22,
        duration: 18,
        delay: 0,
        rotation: 25,
      },

      {
        id: 2,
        left: "22%",
        size: 16,
        duration: 24,
        delay: 5,
        rotation: -35,
      },

      {
        id: 3,
        left: "38%",
        size: 20,
        duration: 20,
        delay: 9,
        rotation: 60,
      },

      {
        id: 4,
        left: "55%",
        size: 14,
        duration: 26,
        delay: 2,
        rotation: -20,
      },

      {
        id: 5,
        left: "72%",
        size: 24,
        duration: 22,
        delay: 7,
        rotation: 45,
      },

      {
        id: 6,
        left: "88%",
        size: 18,
        duration: 19,
        delay: 12,
        rotation: -50,
      },
    ],
    []
  );

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >

      {leaves.map((leaf) => (

        <span
          key={leaf.id}
          className="
            absolute
            -top-10
            select-none
            text-emerald-500/30
            animate-[leafFall_linear_infinite]
          "
          style={{
            left: leaf.left,
            fontSize: `${leaf.size}px`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `-${leaf.delay}s`,
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          🍃
          
        </span>

        

      ))}

    </div>
  );
}