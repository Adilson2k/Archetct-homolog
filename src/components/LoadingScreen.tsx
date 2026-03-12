import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl tracking-wider text-primary-foreground"
        >
          AM
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px w-24 bg-accent mx-auto mt-4 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
