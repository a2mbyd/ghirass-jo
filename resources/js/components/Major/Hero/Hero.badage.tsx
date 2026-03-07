import { slideUp } from '@/motion/animations';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';

const HeroBadge = () => {
  return (
      <motion.div
          initial={slideUp.initial}
          animate={slideUp.animate}
          transition={{ ...slideUp.transition, delay: 0.1 }}
          className="mb-3 flex w-fit items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3 py-1.5"
      >
          <BookMarked className="h-3 w-3 text-primary-500" strokeWidth={2.5} />
          <span className="text-[11px] font-semibold tracking-widest text-primary-600 uppercase">
              تخصص
          </span>
      </motion.div>
  );
}

export default HeroBadge