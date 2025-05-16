export type Tag = {
    id: string;
    name: string;
    value: string;
    color: string;
}

export type Bookmark = {
    id: string;
    url: string;
    title: string;
    description: string;
    image: string;
    domain: string;
    tags: string[];
    date: number;
}