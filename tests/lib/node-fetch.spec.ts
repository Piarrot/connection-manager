import fetch from "node-fetch";

test("rick and morty api fetch", async () => {
    const url = "https://rickandmortyapi.com/api/character/2";
    const result = await fetch(url);
    const data = await result.json();
    expect(data).toEqual(
        expect.objectContaining({
            id: 2,
            name: "Morty Smith",
            status: "Alive",
            species: "Human",
            gender: "Male",
            origin: {
                name: "Earth (C-137)",
                url: "https://rickandmortyapi.com/api/location/1",
            },
            location: {
                name: "Earth (Replacement Dimension)",
                url: "https://rickandmortyapi.com/api/location/20",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            url: "https://rickandmortyapi.com/api/character/2",
            created: "2017-11-04T18:50:21.651Z",
        })
    );
});
