export type sqcp_data = Record<string, unknown>;

export type sqcp_mappings = Record<string, sqcp_mapping>;

export type sqcp_mapping = Record<string, sqcp_mapping_definition>;

export type sqcp_mapping_definition = {
    key: string;
    type: 'string' | 'integer' | 'float';
};
