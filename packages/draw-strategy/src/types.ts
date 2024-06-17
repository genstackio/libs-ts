export type winner = {
    id: string;
};

export type result_winner = {
    t: string;
    b: string;
};

export type result = {
    id: string;
    createdAt: number;
    winners: result_winner[];
};

export type bunch = {
    id: string;
    quantity?: number;
    rankOffset?: number;
};

export type simple_bunch = {
    id: string;
    nb?: number;
    ro?: number;
};

export type ticket = {
    id: string;
    appliedBunches?: string[];
};

export type draw = {
    strategy?: string;
};

export type execute_fn = (draw: draw, tickets: ticket[], bunches: simple_bunch[]) => Promise<result>;
