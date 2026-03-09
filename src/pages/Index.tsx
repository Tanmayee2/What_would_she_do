import { useNavigate } from "react-router-dom";
import womenLineArt from "@/assets/women-line-art.png";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background font-body">
      {/* Line art background */}
      <img
        src={womenLineArt}
        alt="Elegant line art of women"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 pb-16 text-center">
        <div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:mt-12 md:text-5xl">
            What Would She Do?
          </h1>
          <p className="mt-4 max-w-md font-body text-base text-muted-foreground md:text-lg">
            Get opinions from women icons in their voice
          </p>
        </div>

        {/* Blurred backdrop panel + button */}
        <div className="animate-float rounded-3xl bg-[#F8CAC7]/30 p-12 backdrop-blur-2xl">
          <button
            onClick={() => navigate("/select")}
            className="rounded-xl bg-primary px-10 py-4 font-display text-lg font-semibold text-primary-foreground shadow-[0_8px_30px_-4px_rgba(248,202,199,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-4px_rgba(248,202,199,0.9)] active:translate-y-0 md:text-xl"
          >
            Get your advice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
