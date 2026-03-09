import { useNavigate } from "react-router-dom";
import { womenIcons, WomanIcon } from "@/data/womenIcons";
import IconCard from "@/components/IconCard";
import { ArrowLeft } from "lucide-react";

const SelectIcon = () => {
  const navigate = useNavigate();

  const handleSelect = (icon: WomanIcon) => {
    navigate(`/ask/${icon.id}`);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h2 className="mb-2 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
          Choose your icon
        </h2>
        <p className="mb-10 text-center text-sm text-muted-foreground">
          <span className="hidden sm:inline">Hover to learn more · Click to get her advice</span>
          <span className="sm:hidden">Tap to learn more · Tap again to ask</span>
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {womenIcons.map((icon) => (
            <IconCard key={icon.id} icon={icon} onClick={handleSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectIcon;
