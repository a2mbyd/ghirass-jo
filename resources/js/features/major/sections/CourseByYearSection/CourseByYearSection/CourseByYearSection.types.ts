/** Reusable color/styling for a year block (no label) */
export interface YearColorScheme {
    headerBg: string;
    headerText: string;
    badgeBg: string;
    cardBorder: string;
    cardAccent: string;
    dot: string;
    codeBg: string;
    codeText: string;
    semesterBg: string;
    semesterText: string;
    semesterBorder: string;
}

export interface YearConfig extends YearColorScheme {
    label: string;
}