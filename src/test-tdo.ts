export interface Location {
    name: string;
    url: string;
}

export interface TestDTO {
    id: number;
    name: string;
    status: "Alive";
    species: "Human";
    type: string;
    gender: "Male";
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}
