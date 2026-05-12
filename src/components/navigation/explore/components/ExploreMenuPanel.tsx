import { motion, type Variants } from "framer-motion";
import { Bookmark } from "lucide-react";
import { exploreLinks, featuredExploreCards } from "../explore-navigation.data";
import { ExploreMenuItem } from "./ExploreMenuItem";

type ExploreMenuPanelProps = {
  itemVariants: Variants;
  onClose: () => void;
};

export function ExploreMenuPanel({
  itemVariants,
  onClose,
}: ExploreMenuPanelProps) {
  return (
    <div className="mx-auto flex max-w-7xl px-10 py-12">
      <div className="flex w-1/4 flex-col gap-5 border-r border-white/10 pr-8">
        {exploreLinks.map((item) => (
          <motion.div variants={itemVariants} key={item.name}>
            <ExploreMenuItem item={item} onClose={onClose} />
          </motion.div>
        ))}
      </div>

      <div className="w-3/4 pl-12">
        <motion.h3
          variants={itemVariants}
          className="mb-6 text-xs font-bold tracking-[0.2em] text-white/50"
        >
          Recent Picks
        </motion.h3>

        <div className="grid grid-cols-3 gap-8">
          {featuredExploreCards.map((card) => (
            <motion.a
              variants={itemVariants}
              key={card.title}
              href={card.href ?? "#"}
              className="group flex cursor-pointer flex-col"
              onClick={onClose}
            >
              <div className="relative mb-4 aspect-square overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 text-xs font-bold tracking-[0.1em] text-white">
                {card.readTime}
              </div>
              <h4 className="mb-4 text-xl font-bold leading-tight text-white group-hover:underline">
                {card.title}
              </h4>
              <div className="mt-auto flex items-center text-xs font-bold tracking-wider text-white/70">
                <Bookmark className="mr-2 h-4 w-4" />
                {card.type}
                <span className="ml-4">{card.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
