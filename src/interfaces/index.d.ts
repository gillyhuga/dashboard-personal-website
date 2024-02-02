export interface ITag {
    id: string;
    name: string;
}

export interface IProject {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    tags:Array;
    isPublished: string;
    isSelected: string;
}