import {
  Factory,
  Hammer,
  ShieldCheck,
  Car,
  Flame,
  Sparkles,
  Layers,
  Paintbrush,
  Ruler,
  Users,
  Gift,
  Wallet,
  Clock,
  TreePine,
  MessageCircle,
  MapPin,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  factory: Factory,
  hammer: Hammer,
  shield: ShieldCheck,
  car: Car,
  flame: Flame,
  sparkle: Sparkles,
  layers: Layers,
  brush: Paintbrush,
  ruler: Ruler,
  users: Users,
  gift: Gift,
  wallet: Wallet,
  clock: Clock,
  tree: TreePine,
  message: MessageCircle,
  pin: MapPin,
};

export function Icon({ name, size = 22, className = "" }: { name: string; size?: number; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.6} className={className} />;
}
