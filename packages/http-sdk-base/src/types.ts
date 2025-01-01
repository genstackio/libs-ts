export { Request, Response } from 'cross-fetch';
export type fetch_with_request = (request: Request) => Promise<Response>;
export type fetch_basic = (url: string, options: any) => Promise<Response>;
export type fetch = fetch_with_request | fetch_basic;

export type tokens = {
    accessToken?: string;
    refreshToken?: string;
};

export type auth_data = {
    exp: number;
    id: string;
    permissions: string[];
    scope: string;
    iat: number;
};

export type request_authorization_provider =
    | ((request: Request) => Promise<undefined | string | { [key: string]: any }>)
    | (() => Promise<undefined | string | { [key: string]: any }>);

export type sdk_config = {
    endpoint: string;
    fetch: fetch;
    requestListeners?: request_listener[];
    responseListeners?: response_listener[];
    authorizationProvider?: request_authorization_provider;
};

export type base_input = {
    urlParams?: any;
    [key: string]: any;
};
export type request_listener = (request: Request) => Promise<void>;
export type response_listener = (response: Response) => Promise<void>;

export type HealthInput = {
    urlParams?: any;
};
export type IndexHealthInput = {
    urlParams?: any;
};
export type SearchInput = {
    doc_value_fields?: any[];
    fields?: any[];
    explain?: string;
    from?: number;
    indices_boost?: any[];
    min_score?: number;
    query?: any;
    sort?: SortInput;
    seq_no_primary_term?: boolean;
    size?: number;
    _source?: string;
    stats?: string;
    terminate_after?: string;
    timeout?: any;
    version?: boolean;
    urlParams?: any;
    highlight?: any;
};
export type SearchAllIndicesInput = {
    doc_value_fields?: any[];
    fields?: any[];
    explain?: string;
    from?: number;
    indices_boost?: any[];
    min_score?: number;
    query?: any;
    seq_no_primary_term?: boolean;
    size?: number;
    _source?: string;
    stats?: string;
    terminate_after?: string;
    timeout?: any;
    version?: boolean;
    urlParams?: any;
};
export type CreateIndexInput = {
    settings?: any;
    mappings?: any;
    aliases?: any;
    urlParams?: any;
};
export type DeleteIndexInput = {
    urlParams?: any;
};
export type SqlInput = {
    urlParams?: any;
};
export type GetIndexInput = {
    urlParams?: any;
};
export type CloseIndexInput = {
    urlParams?: any;
};
export type ShrinkIndexInput = {
    settings?: any;
    mappings?: any;
    aliases?: any;
    urlParams?: any;
};
export type UpdateIndexMappingsInput = {
    properties: {
        [key: string]: {
            type: string;
        };
    };
    urlParams?: any;
};
export type IndexDocumentInput = {
    urlParams?: any;
};
export type GetIndexDocumentInput = {
    urlParams?: any;
};
export type HasIndexInput = {
    urlParams?: any;
};
export type UpdateIndexDocumentInput = {
    doc?: any;
    script?: script;
    urlParams?: any;
};
export type DeleteIndexDocumentInput = {
    urlParams?: any;
};
export type ReindexInput = {
    urlParams?: any;
};
export type UpdateIndexDocumentsByQueryInput = {
    urlParams?: any;
};
export type DeleteIndexDocumentsByQueryInput = {
    urlParams?: any;
};
export type GetDocumentsInput = {
    urlParams?: any;
};
export type GetIndexDocumentsInput = {
    urlParams?: any;
};
export type BulkActionsInput = {
    urlParams?: any;
};
export type IndexBulkActionsInput = {
    urlParams?: any;
};
export type CountIndexDocumentsInput = {
    urlParams?: any;
};
export type CountDocumentsInput = {
    urlParams?: any;
};
export type GetTasksInput = {
    urlParams?: any;
};
export type GetTaskInput = {
    urlParams?: any;
};
export type HealthResponse = health_response;
export type IndexHealthResponse = health_response;
export type SearchResponse = search_response;
export type SearchAllIndicesResponse = search_response;

export type CreateIndexResponse = {
    acknowledged: boolean;
    shards_acknowledged?: boolean;
    index?: string;
};
export type DeleteIndexResponse = command_response;
export type GetIndexResponse = {
    [key: string]: {
        aliases?: any;
        mappings?: any;
        settings?: {
            index: {
                creation_date: string;
                number_of_shards: string;
                number_of_replicas: string;
                uuid: string;
                version: {
                    created: string;
                };
                provided_name: string;
            };
        };
    };
};
export type CloseIndexResponse = {
    acknowledged: boolean;
    shards_acknowledged?: boolean;
    indices?: {
        [key: string]: {
            closed: boolean;
        };
    };
};
export type ShrinkIndexResponse = command_response;
export type UpdateIndexMappingsResponse = command_response;
export type ReindexResponse = index_command_response;
export type UpdateIndexDocumentsByQueryResponse = index_command_response;
export type IndexDocumentResponse = document_command_response;
export type UpdateIndexDocumentResponse = document_command_response;
export type DeleteIndexDocumentResponse = document_command_response;
export type DeleteIndexDocumentsByQueryResponse = index_command_response;
export type GetIndexDocumentResponse = document_response;
export type GetIndexDocumentsResponse = {
    docs: document_response[];
};
export type BulkActionsResponse = {
    took: number;
    errors: boolean;
    items: bulk_action_response_item[];
};
export type IndexBulkActionsResponse = {
    took: number;
    errors: boolean;
    items: index_bulk_action_response_item[];
};
export type bulk_action_response_item = any;
export type index_bulk_action_response_item = any;
export type GetDocumentsResponse = {
    docs: document_response[];
};
export type CountDocumentsResponse = count_response;
export type CountIndexDocumentsResponse = count_response;
export type GetTasksResponse = tasks_response;
export type GetTaskResponse = tasks_response;
export type SqlResponse = {
    schema: schema_item[];
    datarows: sql_response_datarow[];
    total: number;
    size: number;
    status: number;
};

export type tasks_response = {
    nodes: {
        [key: string]: {
            name: string;
            transport_address: string;
            host: string;
            ip: string;
            roles: string[];
            tasks: {
                [key: string]: {
                    node: string;
                    id: number;
                    type: string;
                    action: string;
                    start_time_in_millis: number;
                    running_time_in_nanos: number;
                    cancellable: boolean;
                    parent_task_id: string;
                    headers: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
};
export type count_response = {
    count: number;
    _shards?: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
};
export type command_response = {
    acknowledged: boolean;
};
export type index_command_response = {
    took: number;
    timed_out: boolean;
    total: number;
    updated: number;
    created: number;
    deleted: number;
    batches: number;
    version_conflicts: number;
    noops: number;
    retries?: {
        bulk: number;
        search: number;
    };
    throttled_millis: number;
    requests_per_second: number;
    throttled_until_millis: number;
    failures?: any[];
};
export type document_response = {
    _index: string;
    _type: string;
    _id: string;
    _version: number;
    _seq_no: number;
    _primary_term: number;
    found: boolean;
    _source: any;
};
export type document_command_response = {
    _index: string;
    _type: string;
    _id: string;
    _version: number;
    result: string;
    _shards?: {
        total: number;
        successful: number;
        failed: number;
    };
    _seq_no: number;
    _primary_term: number;
};
export type search_response = {
    took: number;
    timed_out: boolean;
    _shards?: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: {
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: any;
        }[];
    };
};
export type health_response = {
    cluster_name: string;
    status: string;
    timed_out: boolean;
    number_of_nodes: number;
    number_of_data_nodes: number;
    active_primary_shards: number;
    active_shards: number;
    relocating_shards: number;
    initializing_shards: number;
    unassigned_shards: number;
    delayed_unassigned_shards: number;
    number_of_pending_tasks: number;
    number_of_in_flight_fetch: number;
    task_max_waiting_in_queue_millis: number;
    active_shards_percent_as_number: number;
};
export type schema_item = {
    name: string;
    type: string;
};
export type sql_response_datarow = any[];

export type script = {
    source: string;
    lang?: string;
    params?: any;
};
export type update_query = {
    term: any;
};
export type delete_query = {
    match: any;
};
export type document_query = {
    _id: string;
    _type?: string;
    _index: string;
    _source?: {
        include?: string[];
        exclude?: string[];
    };
};
export type index_document_query = {
    _id: string;
    _type?: string;
    _source?: {
        include?: string[];
        exclude?: string[];
    };
};
export type bulk_action = any;
export type index_bulk_action = any;

export type SortInput = {
    [key: string]: {
        order: string;
        mode?: string;
    };
}[];
