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

export const majors = [
    {
        slug: 'DES',
        label: 'هندسة وأمن شبكات الحاسوب',
        Icon: Network,
        description:
            'تصميم وإدارة شبكات الحاسوب وحمايتها من الهجمات والاختراقات.',
        accent: 'from-sky-600 to-cyan-500',
    },
    {
        slug: 'CY',
        label: 'الأمن السيبراني',
        Icon: ShieldCheck,
        description:
            'حماية الأنظمة والشبكات من الهجمات والتهديدات الإلكترونية.',
        accent: 'from-red-600 to-orange-500',
    },
    {
        slug: 'CPE',
        label: 'هندسة الحاسوب',
        Icon: Cpu,
        description: 'تصميم وبناء العتاد والبرمجيات التي تشغّل الحواسيب.',
        accent: 'from-blue-700 to-cyan-500',
    },
    {
        slug: 'SE',
        label: 'هندسة البرمجيات',
        Icon: Code2,
        description: 'بناء أنظمة برمجية عالية الجودة وقابلة للتطوير.',
        accent: 'from-violet-600 to-purple-500',
    },
    {
        slug: 'CIS',
        label: 'نظم المعلومات الحاسوبية',
        Icon: ServerCog,
        description: 'تحليل وتصميم نظم المعلومات لخدمة المؤسسات والأعمال.',
        accent: 'from-sky-600 to-blue-400',
    },
    {
        slug: 'CS',
        label: 'علوم الحاسوب',
        Icon: Laptop,
        description: 'أساسيات البرمجة، الخوارزميات، وهياكل البيانات.',
        accent: 'from-indigo-600 to-blue-500',
    },
    {
        slug: 'AI',
        label: 'الذكاء الاصطناعي',
        Icon: BrainCircuit,
        description: 'تطوير نماذج وخوارزميات الذكاء الاصطناعي والتعلم الآلي.',
        accent: 'from-cyan-600 to-teal-500',
    },
    {
        slug: 'DS',
        label: 'علم البيانات',
        Icon: BarChart3,
        description:
            'استخراج المعرفة من البيانات واتخاذ قرارات مبنية على التحليل.',
        accent: 'from-emerald-600 to-green-500',
    },
    {
        slug: 'IoT',
        label: 'إنترنت الأشياء',
        Icon: RadioTower,
        description: 'ربط الأجهزة بالإنترنت وبناء أنظمة ذكية متصلة.',
        accent: 'from-teal-600 to-cyan-400',
    },
    {
        slug: 'GD',
        label: 'تصميم وتطوير ألعاب الحاسوب',
        Icon: Gamepad2,
        description: 'ابتكار عوالم تفاعلية وتجارب لعب ممتعة.',
        accent: 'from-fuchsia-600 to-pink-400',
    },
    {
        slug: 'ROB',
        label: 'علم الروبوتات',
        Icon: Bot,
        description: 'تصميم وبرمجة الروبوتات والتطبيقات الذكية للحركة والتحكم.',
        accent: 'from-orange-600 to-amber-400',
    },
    {
        slug: 'HIS',
        label: 'نظم المعلومات الصحية',
        Icon: Stethoscope,
        description:
            'إدارة وتحليل بيانات القطاع الصحي باستخدام تقنيات المعلومات.',
        accent: 'from-green-600 to-emerald-400',
    },
];
