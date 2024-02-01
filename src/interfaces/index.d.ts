export interface ITag {
    id: number;
    name: string;
}

export interface IProject {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    tags:Array;
    isPublished: string;
    isSelected: string;
}