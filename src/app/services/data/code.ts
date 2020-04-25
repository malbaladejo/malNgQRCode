export class Code {
    public id: string;
    public scanDate: Date;
    public code: string;
    public action: CodeAction
}

export enum CodeAction {
    Scan,
    Generate
}