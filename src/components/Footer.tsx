import { Instagram, Facebook, MapPin } from "lucide-react";
import { empresa } from "../data/content";
import { waLink, waMessages } from "../lib/whatsapp";

function IconeWhats({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.11-.43-4.41-1.19l-.32-.19-3.01.79.8-2.94-.2-.31A7.94 7.94 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.42-5.98c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

const redes = [
  { href: waLink(waMessages.floating), label: "WhatsApp", Icone: null },
  { href: empresa.instagram, label: "Instagram", Icone: Instagram },
  { href: empresa.facebook, label: "Facebook", Icone: Facebook },
  { href: empresa.google, label: "Google", Icone: MapPin },
];

export function Footer() {
  return (
    <footer className="bg-noite py-12">
      <div className="wrap flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-[1.15rem] uppercase tracking-wide text-white">{empresa.nome}</p>
          <p className="mt-3 text-[0.84rem] text-claro-fraco">CNPJ {empresa.cnpj}</p>
          <p className="mt-1 text-[0.84rem] text-claro-fraco">{empresa.endereco}</p>
        </div>

        <div className="md:text-right">
          <div className="flex gap-2 md:justify-end">
            {redes.map(({ href, label, Icone }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="grid h-10 w-10 place-items-center border border-white/15 text-claro-fraco transition-colors duration-300 hover:border-laranja hover:bg-laranja hover:text-white"
              >
                {Icone ? <Icone size={18} strokeWidth={1.7} /> : <IconeWhats />}
              </a>
            ))}
          </div>
          <p className="mt-6 text-[0.78rem] text-claro-fraco/70">
            © {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
