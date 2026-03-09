import fridaKahlo from "@/assets/icons/frida-kahlo.jpg";
import marieCurie from "@/assets/icons/marie-curie.jpg";
import ameliaEarhart from "@/assets/icons/amelia-earhart.jpg";
import ruthBaderGinsburg from "@/assets/icons/ruth-bader-ginsburg.jpg";
import virginiaWoolf from "@/assets/icons/virginia-woolf.jpg";
import anandibaiJoshi from "@/assets/icons/anandibai-joshi.jpg";
import serenaWilliams from "@/assets/icons/serena-williams.jpg";
import sylviaPlath from "@/assets/icons/sylvia-plath.jpg";
import adaLovelace from "@/assets/icons/ada-lovelace.jpg";
import savitribaiPhule from "@/assets/icons/savitribai-phule.jpg";
import graceHopper from "@/assets/icons/grace-hopper.jpg";
import dollyParton from "@/assets/icons/dolly-parton.jpg";

export interface WomanIcon {
  id: string;
  name: string;
  image: string;
  topic: string;
  description: string;
}

export const womenIcons: WomanIcon[] = [
  { id: "sylvia-plath", name: "Sylvia Plath", image: sylviaPlath, topic: "Resilience", description: "Groundbreaking poet and novelist whose raw, confessional writing explored identity, depression, and the female experience with unflinching honesty." },
  { id: "frida-kahlo", name: "Frida Kahlo", image: fridaKahlo, topic: "Self-expression", description: "Fearless Mexican artist who turned personal pain into powerful self-portraits that challenged beauty standards worldwide." },
  { id: "ada-lovelace", name: "Ada Lovelace", image: adaLovelace, topic: "Vision", description: "Visionary mathematician who wrote the first computer algorithm in the 1840s, earning her the title of the world's first programmer." },
  { id: "marie-curie", name: "Marie Curie", image: marieCurie, topic: "Perseverance", description: "Pioneering physicist who discovered radioactivity and became the first woman to win two Nobel Prizes in different sciences." },
  { id: "amelia-earhart", name: "Amelia Earhart", image: ameliaEarhart, topic: "Courage", description: "Aviation pioneer and first woman to fly solo across the Atlantic, inspiring generations to chase the impossible." },
  { id: "ruth-bader-ginsburg", name: "Ruth Bader Ginsburg", image: ruthBaderGinsburg, topic: "Justice", description: "Supreme Court Justice who spent her life dismantling gender discrimination and fighting for equal rights under the law." },
  { id: "savitribai-phule", name: "Savitribai Phule", image: savitribaiPhule, topic: "Equality", description: "India's first female teacher who defied caste and gender oppression to open schools for girls and the marginalized in the 1840s." },
  { id: "grace-hopper", name: "Grace Hopper", image: graceHopper, topic: "Innovation", description: "Computer science pioneer and Navy rear admiral who invented the first compiler and helped create COBOL, shaping modern computing." },
  { id: "virginia-woolf", name: "Virginia Woolf", image: virginiaWoolf, topic: "Independence", description: "Modernist literary icon whose stream-of-consciousness novels and feminist essays like A Room of One's Own transformed literature forever." },
  { id: "anandibai-joshi", name: "Dr. Anandibai Joshi", image: anandibaiJoshi, topic: "Determination", description: "First Indian woman to earn a medical degree in the United States in 1886, inspiring generations of women in medicine." },
  { id: "dolly-parton", name: "Dolly Parton", image: dollyParton, topic: "Kindness", description: "Country music legend, philanthropist, and literacy champion who donated over 200 million books to children worldwide." },
  { id: "serena-williams", name: "Serena Williams", image: serenaWilliams, topic: "Strength", description: "Greatest tennis player of all time who dominated the sport for two decades and redefined what athletes can achieve." },
];
