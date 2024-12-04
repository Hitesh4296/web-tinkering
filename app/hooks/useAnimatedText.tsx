import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";

export default function useAnimatedText(text: string, delimiter: string = "") {
  let animatedCursor = useMotionValue(0);
  let [cursor, setCursor] = useState(0);
  let [prevText, setPrevText] = useState(text);
  let [isSameText, setIsSameText] = useState(true);

  if (prevText !== text) {
    setPrevText(text);
    setIsSameText(text.startsWith(prevText));

    if (!text.startsWith(prevText)) {
      setCursor(0);
    }
  }

  useEffect(() => {
    if (!isSameText) {
      animatedCursor.jump(0);
    }

    let controls = animate(animatedCursor, text.split(delimiter).length, {
      duration: 1,
      ease: "easeOut",
      onUpdate(latest) {
        setCursor(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [animatedCursor, isSameText, text]);

  return text.split(delimiter).slice(0, cursor).join(delimiter);
}

// export default function useAnimatedText(text: string) {
//   const [cursor, setCursor] = useState(0);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (cursor >= text.length) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       return;
//     }

//     intervalRef.current = setInterval(() => {
//       if (cursor >= text.length) {
//         return;
//       }
//       setCursor((prev) => prev + 1);
//     }, 50);
//     return () => {
//       if (intervalRef.current) {
//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//         }
//       }
//     };
//   }, [text]);

//   console.log(text.length, cursor);

//   if (cursor > text.length) {
//     return text;
//   }

//   return text.slice(0, cursor);
// }
