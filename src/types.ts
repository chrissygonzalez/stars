export type Tag = {
    id: string;
    name: string;
    value: string;
}

export type Bookmark = {
    id: string;
    url: string;
    title: string;
    description: string;
    image: string;
    domain: string;
    tags: string[];
}