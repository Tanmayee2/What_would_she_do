import { useState } from "react";
import { WomanIcon } from "@/data/womenIcons";

interface IconCardProps {
  icon: WomanIcon;
  onClick: (icon: WomanIcon) => void;
}

const IconCard = ({ icon, onClick }: IconCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setIsFlipped(true), 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsFlipped(false);
  };

  const handleTap = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    } else {
      onClick(icon);
    }
  };

  return (
    <div
      className="group cursor-pointer [perspective:600px]"
      onClick={() => {
        // On touch devices, first tap flips, second tap navigates
        if ("ontouchstart" in window) {
          handleTap();
        } else {
          onClick(icon);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-40 w-full transition-transform duration-500 [transform-style:preserve-3d] sm:h-48"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted p-3 shadow-md [backface-visibility:hidden] sm:gap-3 sm:p-4">
          <img
            src={icon.image}
            alt={icon.name}
            className="h-16 w-16 rounded-full border-2 border-border object-cover object-top sm:h-24 sm:w-24"
          />
          <p className="text-center font-display text-xs font-semibold leading-tight text-foreground sm:text-sm">
            {icon.name}
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-accent p-4 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5">
          <p className="mb-1 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground sm:text-sm">
            {icon.topic}
          </p>
          <p className="text-center font-body text-[11px] leading-relaxed text-accent-foreground/80 sm:text-xs">
            {icon.description}
          </p>
          <p className="mt-2 text-[10px] text-accent-foreground/50 sm:hidden">
            Tap again to ask
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconCard;
