import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaixaScroll } from "../components/FaixaScroll";
import { Hero } from "../sections/Hero";
import { Dor } from "../sections/Dor";
import { Entrega } from "../sections/Entrega";
import { ComoFazemos } from "../sections/ComoFazemos";
import { Portfolio } from "../sections/Portfolio";
import { Materiais } from "../sections/Materiais";
import { Verniz } from "../sections/Verniz";
import { Cobertura } from "../sections/Cobertura";
import { Provas } from "../sections/Provas";
import { QuemFabrica } from "../sections/QuemFabrica";
import { Atendimento } from "../sections/Atendimento";
import { Faq } from "../sections/Faq";
import { CtaFinal } from "../sections/CtaFinal";

export function Home() {
  return (
    <>
      <Header />
      <main>
        {/* noite (foto) */}
        <Hero />
        {/* serragem, claro */}
        <Dor />

        <FaixaScroll
          src="/img/flow-01.webp"
          alt="Pergolado de madeira cobrindo uma área externa"
          frase="A sombra certa muda o uso do espaço inteiro."
        />

        {/* carvão */}
        <Entrega />
        {/* oficina, azul */}
        <ComoFazemos />
        {/* noite */}
        <Portfolio />

        <FaixaScroll
          src="/img/flow-02.webp"
          alt="Estrutura de madeira natural em área de lazer"
          frase="Cada peça sai da oficina pronta para subir."
        />

        {/* serragem, claro */}
        <Materiais />
        {/* carvão */}
        <Verniz />
        {/* oficina, azul */}
        <Cobertura />

        <FaixaScroll
          src="/img/flow-03.webp"
          alt="Detalhe do acabamento e do encaixe da madeira"
          frase="O acabamento é o que separa o projeto bom do projeto certo."
        />

        {/* noite com foto */}
        <Provas />
        {/* serragem, claro */}
        <QuemFabrica />
        {/* carvão */}
        <Atendimento />
        {/* serragem, claro */}
        <Faq />
        {/* foto com grade */}
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
