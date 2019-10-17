import {GraphQLClient } from 'graphql-request';
import {action, observable} from "mobx";
import {BASE_URL, GRAPHCOOL_TOKEN} from "../utils/Constants";
import {categoriesQuery,placesQuery} from "../graphql/Queries";
import {Category} from "../models/Category";
import {Place} from "../models/Place";

 class GraphQlStore{

     @observable categories=[];
     @observable places=[];
     @observable features=[];
     @observable items=[];
     @observable loading = false;

     client = new GraphQLClient(BASE_URL, { headers: {
             Authorization: `Bearer ${GRAPHCOOL_TOKEN}` ,
         } });

     @action.bound
     getAllCategories(){
         this.loading=true;
         this.client.request(categoriesQuery)
             .then(result =>{
                 console.log("Categories data ->",result);
                 result["allCategories"].forEach((n)=>{
                     let c=new Category();
                     c.id=n["id"];
                     c.label=n["label"] ;
                     c.imageUrl=n["imageUrl"];
                     this.categories.push(c);
                 });
                 this.loading=false;
             }).catch((error)=>{
             console.log('Error',error);
             this.loading=false;
         });
     }

     @action.bound
     getAllPlaces(){
         this.loading=true;
         this.client.request(placesQuery)
             .then(result =>{
                 console.log("Places data ->",result);
                 result["allPlaces"].forEach((n)=>{
                     let p=new Place();
                     p.id=n["id"];
                     p.label=n["label"] ;
                     p.logo=n["logo"];
                     n["locations"].forEach((i)=>{
                         let l=new Location();
                         l.id=i["id"];
                         l.latitude=i["latitude"];
                         l.longitude=i["longitude"];
                         p.locations.push(l);
                     });
                     this.places.push(p);
                 });
                 this.loading=false;
             }).catch((error)=>{
             console.log('Error',error);
             this.loading=false;
         });
     }

 }

 export default new GraphQlStore;