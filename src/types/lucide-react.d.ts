declare module 'lucide-react' {
  import React from 'react';
  
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

  export const LayoutDashboard: LucideIcon;
  export const Users: LucideIcon;
  export const Cherry: LucideIcon;
  export const Package: LucideIcon;
  export const Calendar: LucideIcon;
  export const LineChart: LucideIcon;
  export const Settings: LucideIcon;
  export const MessageSquareHeart: LucideIcon;
  export const Info: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Sparkles: LucideIcon;
  export const User: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Sprout: LucideIcon;
  export const Droplets: LucideIcon;
  export const Wheat: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const Sunrise: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Bug: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Star: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const History: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const Send: LucideIcon;
  export const Trash2: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const Wrench: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const UserCheck: LucideIcon;
  export const PackageCheck: LucideIcon;
  export const Bell: LucideIcon;
  export const Search: LucideIcon;
  export const Flame: LucideIcon;
  export const Clock: LucideIcon;
  export const Pencil: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Activity: LucideIcon;
}
