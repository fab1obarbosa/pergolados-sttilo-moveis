import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fundo de foto tratado: a imagem corre mais devagar que a página, um véu por
 * cima segura o contraste do texto, a grade fina dá a leitura de planta de obra
 * e uma luz atravessa devagar para a seção não ficar parada.
 */
export function FundoSecao({
  src,
  opacidade = 0.22,
  veu = "linear-gradient(180deg, rgba(10,19,48,.95) 0%, rgba(10,19,48,.82) 50%, rgba(10,19,48,.96) 100%)",
  grade = true,
  luz = true,
}: {
  src: string;
  opacidade?: number;
  veu?: string;
  grade?: boolean;
  luz?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desloca = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div ref={ref} className="absolute inset-0 z-fundo overflow-hidden" aria-hidden="true">
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        style={reduzido ? { opacity: opacidade } : { y: desloca, scale: zoom, opacity: opacidade }}
        className="absolute inset-0 h-[114%] w-full object-cover"
      />

      <div className="absolute inset-0" style={{ background: veu }} />

      {grade && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(174,187,214,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(174,187,214,.07) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(ellipse 78% 70% at 50% 45%, #000 30%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse 78% 70% at 50% 45%, #000 30%, transparent 76%)",
          }}
        />
      )}

      {luz && !reduzido && (
        <div
          className="absolute -inset-x-1/4 inset-y-0 animate-luz-varre"
          style={{
            background:
              "radial-gradient(38% 60% at 50% 45%, rgba(244,162,86,.13) 0%, rgba(24,95,165,.08) 45%, transparent 72%)",
          }}
        />
      )}
    </div>
  );
}
