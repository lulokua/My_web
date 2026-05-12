import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ExploreLink } from "../types";

type ExploreMenuItemProps = {
  item: ExploreLink;
  level?: number;
  onClose: () => void;
};

export function ExploreMenuItem({
  item,
  level = 0,
  onClose,
}: ExploreMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isTopLevel = level === 0;
  const itemClassName = isTopLevel
    ? "block text-[15px] font-medium text-white transition-colors hover:text-white/70"
    : "block py-1 text-sm font-medium text-white/70 transition-colors hover:text-white";

  if (!item.subItems?.length) {
    return (
      <a
        href={item.href ?? "#"}
        className={itemClassName}
        onClick={onClose}
      >
        {item.name}
      </a>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className={`flex items-center justify-between text-left ${itemClassName}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{item.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              marginTop: isTopLevel ? 16 : 8,
            }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`overflow-hidden pl-4 ${
              isTopLevel ? "flex flex-col gap-4" : "flex flex-col gap-2"
            }`}
          >
            {item.subItems.map((subItem) => (
              <ExploreMenuItem
                key={`${item.name}-${subItem.name}`}
                item={subItem}
                level={level + 1}
                onClose={onClose}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
