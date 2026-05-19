import { SparklesCore } from "../ui/sparkles";
import aws from "../../assets/logos/aws.png";
import codingblocks from "../../assets/logos/codingblocks.png";
import codingninja from "../../assets/logos/codingninja.png";
import d4 from "../../assets/logos/d4.jpg";
import encrypted from "../../assets/logos/encrypted.jpg";
import gdg from "../../assets/logos/gdg.jpg";

export default function SparklesLogo() {
  return (
    <div className="w-full overflow-hidden bg-background pt-32 pb-16 transition-colors duration-300">
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4">
        <div className="text-center text-4xl md:text-5xl font-bold text-foreground">
          <span className="text-rose-600">Trusted by experts.</span>
          <br className="md:hidden" />
          <span className="md:ml-3">Used by the leaders.</span>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-12 md:grid-cols-6 items-center opacity-100">
          <img
            src={aws}
            alt="AWS"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
          <img
            src={codingblocks}
            alt="Coding Blocks"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
          <img
            src={codingninja}
            alt="Coding Ninja"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
          <img
            src={d4}
            alt="D4"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
          <img
            src={encrypted}
            alt="Encrypted"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
          <img
            src={gdg}
            alt="GDG"
            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all mx-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-20 h-40 w-full overflow-hidden [mask-image:radial-gradient(circle,white,transparent_80%)]">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={200}
          particleColor="hsl(var(--foreground))"
          className="absolute inset-x-0 bottom-0 h-full w-full"
        />
      </div>
    </div>
  );
}
