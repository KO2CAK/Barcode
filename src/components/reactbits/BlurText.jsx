import { motion, useReducedMotion } from "framer-motion";

export default function BlurText({ text, className = "" }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          key={`${word}-${index}`}
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)", y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.045, ease: "easeOut" }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
