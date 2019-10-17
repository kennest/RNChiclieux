export const categoriesQuery =`{
  allCategories(orderBy: createdAt_DESC) {
    id
    label
    imageUrl
  }
}`;

export const placesQuery=`{
  allPlaces(orderBy: createdAt_ASC) {
    id
    label
    logo
    locations {
      id
      latitude
      longitude
    }
  }
}`;

export const filterPlaceByLabel=`
query($search:String!) {
  allPlaces(filter: {label_contains: $search}) {
    id
    label
    locations {
      id
      latitude
      longitude
    }
  }
}
`;
