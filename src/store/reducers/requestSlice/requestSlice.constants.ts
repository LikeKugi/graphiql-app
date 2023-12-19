export const initialGraphQL = `query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
    name
  }
  episodesByIds(ids: [1, 2]) {
    id
    name
  }
}`;
