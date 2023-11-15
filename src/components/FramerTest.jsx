import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "framer-motion";

export const SpinningShapeShiftingDiv = () => {
  return (
    <motion.div
      className="h-[400px] w-[400px] bg-blue-500"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
};

export const HoverFramer = () => (
  <motion.button
    className="h-[400px] w-[400px] bg-blue-500"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  />
);

export const DragFramer = ({ letter }) => (
  // <motion.div
  //   className=" bg-blue-500"
  //   drag
  //   dragElastic={0}
  //   dragMomentum={false}
  //   dragConstraints={{
  //     top: -300,
  //     left: -300,
  //     right: 300,
  //     bottom: 300,
  //   }}
  // />
  <motion.div className="" drag dragElastic={0} dragMomentum={false}>
    <span className="text-[5rem] font-bold text-blue-400">{letter}</span>
  </motion.div>
);

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(0, 10, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax ">
      <motion.div className="scroller " style={{ x }}>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
        <span className=" font-serif text-red-200">{children} </span>
      </motion.div>
    </div>
  );
}

export function SpeedText() {
  return (
    <section className="h-screen">
      <ParallaxText baseVelocity={1}>
        <p className="me-2 inline font-sans2 text-[1rem] italic tracking-wider">
          RITA
        </p>
        <p className="inline  text-[1.5rem]">kibaki</p>
      </ParallaxText>
      <ParallaxText baseVelocity={-1}>
        <p className="me-2 inline font-sans2 text-[1rem] italic tracking-wider">
          RITA
        </p>
        <p className="inline  text-[1.5rem]">kibaki</p>
      </ParallaxText>
    </section>
  );
}
