export const categoriesQuery = `{
  allCategories(orderBy: createdAt_DESC) {
    id
    label
    imageUrl
     places {
      id
      label
    }
  }
}`;

export const placesQuery = `{
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

export const filterPlaceByLabel = `
query($search:String!) {
  allPlaces(filter: { OR:[
      {label_contains: $search},
      {categories_some:{features_some:{items_some:{label_contains:$search}}}}
           ]}) {
    id
    label
    logo
    locations {
      id
      latitude
      longitude
      adresse
    }
    categories {
      id
      label
      imageUrl
    }
  }
}`;


export const filterPlaceByCategoryLabel = `
query($search:String!) {
  allPlaces(filter: { 
      categories_some:{label_contains:$search}
           }) {
    id
    label
    logo
    locations {
      id
      latitude
      longitude
      adresse
    }
  }
}`;

export const createClient = `
mutation($avatar:String,$birthdate:DateTime,$sex:String,$username:String!,$password:String!,$phone:String!) {
  createClient(avatar: $avatar,
    birthdate: $birthdate,
    sex: $sex, 
    username: $username,
    password: $password,
  phone:$phone){id}
}
`;
