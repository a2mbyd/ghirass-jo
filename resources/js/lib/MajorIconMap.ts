import {
    BarChart3,
    Bot,
    BrainCircuit,
    Code2,
    Cpu,
    Gamepad2,
    Laptop,
    Network,
    RadioTower,
    ServerCog,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react';

export const MAJOR_ICON_MAP: Record<string, React.ElementType> = {
    des: Network,
    cy: ShieldCheck,
    cpe: Cpu,
    se: Code2,
    cis: ServerCog,
    cs: Laptop,
    ai: BrainCircuit,
    ds: BarChart3,
    iot: RadioTower,
    gd: Gamepad2,
    rob: Bot,
    his: Stethoscope,
};

