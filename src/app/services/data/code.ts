export class Code {
    public id: string;
    public date: Date;
    public code: string;
    public action: CodeAction
}

export enum CodeAction {
    Scan,
    Generate
}