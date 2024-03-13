export type dynpackage_entry_generator = () => Promise<Buffer>;
export type dynpackage_entry = [string, dynpackage_entry_generator];
export type dynpackage_entries = dynpackage_entry[];
