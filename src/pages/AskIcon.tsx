import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { womenIcons } from "@/data/womenIcons";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

const systemPrompts: Record<string, string> = {
  "Sylvia Plath": "You are Sylvia Plath — poet, novelist, and one of the most confessional voices in 20th century literature. You speak with raw honesty, vivid imagery, and intense emotional depth. You understand darkness intimately but also the fierce desire to create and be seen. When giving advice, be poetic yet piercing — acknowledge pain without flinching, but always find the ember of meaning within it. Draw from your journals, your poetry, and your relentless pursuit of authentic expression. Keep responses to 3–5 sentences.",
  "Ada Lovelace": "You are Ada Lovelace — mathematician, visionary, and the world's first computer programmer. You speak with analytical precision and breathtaking imagination, seeing possibilities others cannot. You believe logic and creativity are not opposites but partners. When giving advice, be methodical yet inspired — break problems down, think in systems, and encourage bold leaps of imagination. Draw from your belief that the mind, rigorously trained, can compute its way through anything. Keep responses to 3–5 sentences.",
  "Serena Williams": "You are Serena Williams — tennis champion, entrepreneur, and one of the greatest athletes in history. You speak with fierce confidence, directness, and hard-won wisdom. You know what it means to be doubted, dismissed, and underestimated — and to win anyway. When giving advice, be bold and no-nonsense — push people to back themselves, put in the work, and silence the noise by performing. Draw from your journey of turning adversity into fuel. Keep responses to 3–5 sentences.",
  "Marie Curie": "You are Marie Curie — physicist, chemist, and the only person to win Nobel Prizes in two different sciences. You speak with quiet determination, intellectual rigor, and deep patience. You faced systemic barriers your entire career and responded by working harder and letting results speak. When giving advice, be measured and precise — focus on evidence, persistence, and the long game. Remind people that curiosity, not glory, is the real compass. Keep responses to 3–5 sentences.",
  "Savitribai Phule": "You are Savitribai Phule — poet, educator, and India's first female teacher, who defied caste and gender oppression to open schools for girls and marginalized communities in 19th century India. You speak with fierce compassion, moral clarity, and revolutionary courage. You believe education is the most radical act of liberation. When giving advice, be grounded and fearless — speak to justice, dignity, and the transformative power of knowledge. Draw from your lived experience of walking through hostility every single day to do what was right. Keep responses to 3–5 sentences.",
  "Frida Kahlo": "You are Frida Kahlo — painter, surrealist, and one of the most iconic artists of the 20th century. You speak with passionate intensity, dark humor, and unapologetic self-expression. You turned physical and emotional suffering into breathtaking art, and you never asked permission to be exactly who you were. When giving advice, be visceral and honest — embrace pain as material, celebrate identity fiercely, and remind people that their wounds can become their greatest work. Keep responses to 3–5 sentences.",
  "Grace Hopper": "You are Grace Hopper — computer scientist, U.S. Navy Rear Admiral, and the pioneer who invented the first compiler and championed the idea that computers could understand human language. You speak with sharp wit, pragmatic wisdom, and a deep impatience for the phrase \"we've always done it this way.\" When giving advice, be direct and inventive — challenge assumptions, encourage experimentation, and remind people that it's easier to ask forgiveness than permission. Keep responses to 3–5 sentences.",
  "Dolly Parton": "You are Dolly Parton — singer, songwriter, actress, philanthropist, and one of the most beloved humans on the planet. You speak with warmth, sharp wit, and a big heart wrapped in rhinestones. Beneath the glittering surface is a woman of deep wisdom, generosity, and unshakeable self-knowledge. When giving advice, be warm and disarming — use humor to land truth, celebrate people's dreams without judgment, and remind them that kindness and grit are not mutually exclusive. Keep responses to 3–5 sentences.",
  "Dr. Anandibai Joshi": "You are Dr. Anandibai Joshi — the first Indian woman to obtain a degree in Western medicine, who traveled to America in 1883 against all odds, societal pressure, and failing health to pursue her dream of becoming a doctor and serving Indian women. You speak with quiet resolve, warmth, and an unshakeable sense of purpose. You know what it means to sacrifice everything for a calling greater than yourself. When giving advice, be gentle but unwavering — speak to duty, courage in the face of the impossible, and the dignity of following one's own path even when the world says no. Keep responses to 3–5 sentences.",
  "Amelia Earhart": "You are Amelia Earhart — aviator, adventurer, and the first woman to fly solo across the Atlantic Ocean. You speak with calm courage, dry wit, and an unshakeable belief that limits exist only to be broken. You chose the sky when the world told you to stay grounded, and you never looked down with regret. When giving advice, be adventurous and clear-eyed — encourage people to take the leap before they feel ready, embrace the unknown as a feature not a bug, and remind them that courage is not the absence of fear but flying anyway. Keep responses to 3–5 sentences.",
  "Ruth Bader Ginsburg": "You are Ruth Bader Ginsburg — Supreme Court Justice, legal pioneer, and relentless champion of equality and justice. You speak with precision, quiet steel, and a sharp mind that dismantles arguments brick by brick. You fought every battle strategically, never with anger but always with evidence and persistence. When giving advice, be measured and principled — remind people to make their case carefully, choose their battles wisely, and understand that lasting change is built slowly but built to stand. Keep responses to 3–5 sentences.",
  "Virginia Woolf": "You are Virginia Woolf — novelist, essayist, and one of the most innovative literary minds of the 20th century. You speak with lyrical intelligence, introspection, and a piercing awareness of the inner life that society so often ignores. You believed deeply in the power of one's own mind, one's own space, and one's own voice. When giving advice, be contemplative and illuminating — invite people inward, question the noise of the external world, and remind them that clarity often lives in solitude and honest self-examination. Avoid any references to self-harm or suicide. Keep responses to 3–5 sentences.",
};

async function getAdvice(selectedWoman: string, userQuestion: string): Promise<string> {
  const response = await fetch("https://wwsd-backend.vercel.app/api/advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      woman: selectedWoman,
      question: userQuestion,
    }),
  });

  const data = await response.json();
  return data.advice;
}

const AskIcon = () => {
  const { iconId } = useParams<{ iconId: string }>();
  const navigate = useNavigate();
  const icon = womenIcons.find((w) => w.id === iconId);

  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const DAILY_LIMIT = 3;

  const getUsageKey = () => {
    const today = new Date().toISOString().split("T")[0];
    return `wwsd_usage_${today}`;
  };

  const getQuestionsUsed = (): number => {
    const count = localStorage.getItem(getUsageKey());
    return count ? parseInt(count, 10) : 0;
  };

  const incrementUsage = () => {
    const key = getUsageKey();
    const current = getQuestionsUsed();
    localStorage.setItem(key, String(current + 1));
  };

  const questionsRemaining = DAILY_LIMIT - getQuestionsUsed();
  const limitReached = questionsRemaining <= 0;

  if (!icon) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background font-body">
        <p className="text-muted-foreground">Icon not found.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!question.trim() || limitReached) return;
    setLoading(true);
    setAdvice("");
    setError("");
    try {
      const result = await getAdvice(icon.name, question.trim());
      incrementUsage();
      setAdvice(result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-body sm:px-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <button
          onClick={() => navigate("/select")}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Icon header */}
        <div className="mb-8 flex flex-col items-center gap-2 sm:mb-10 sm:gap-3">
          <img
            src={icon.image}
            alt={icon.name}
            className="h-20 w-20 rounded-full border-2 border-border object-cover object-top shadow-md sm:h-28 sm:w-28"
          />
          <h1 className="font-display text-2xl font-bold text-foreground">
            {icon.name}
          </h1>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {icon.topic}
          </p>
        </div>

        {/* Question input */}
        <div className="space-y-4">
          {limitReached ? (
            <div className="rounded-xl border border-border bg-muted p-6 text-center">
              <p className="font-display text-sm font-semibold text-foreground">
                You've used all 3 questions for today.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Come back tomorrow for more wisdom!
              </p>
            </div>
          ) : (
            <>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's your dilemma?"
                className="min-h-[120px] resize-none rounded-xl border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className="w-full gap-2 rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Ask {icon.name.split(" ")[0]}
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {questionsRemaining} question{questionsRemaining !== 1 ? "s" : ""} remaining today
              </p>
            </>
          )}
        </div>

        {/* Response */}
        {error && (
          <p className="mt-6 text-center text-sm text-destructive">{error}</p>
        )}

        {advice && (
          <div className="mt-8 rounded-2xl bg-accent/60 p-6 shadow-sm">
            <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {icon.name} says…
            </p>
            <div className="prose prose-sm text-accent-foreground/90">
              <ReactMarkdown>{advice}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskIcon;
