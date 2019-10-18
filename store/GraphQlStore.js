import {GraphQLClient} from 'graphql-request';
import {action, observable} from "mobx";
import {BASE_URL, GRAPHCOOL_TOKEN} from "../utils/Constants";
import {categoriesQuery, placesQuery, filterPlaceByLabel,filterPlaceByCategoryLabel} from "../graphql/Queries";
import {Category} from "../models/Category";
import {Place} from "../models/Place";
import {Location} from "../models/Location";
import Snackbar from 'react-native-snackbar';

class GraphQlStore {

    @observable categories = [];
    @observable.ref places = [];
    @observable.ref positions = [];
    @observable features = [];
    @observable items = [];
    @observable loading = false;

    client = new GraphQLClient(BASE_URL, {
        headers: {
            Authorization: `Bearer ${GRAPHCOOL_TOKEN}`,
        }
    });

    getAllCategories() {
        this.loading = true;
        this.client.request(categoriesQuery)
            .then(result => {
                console.log("Categories data ->", result);
                result["allCategories"].forEach((n) => {
                    let c = new Category();
                    c.id = n["id"];
                    c.label = n["label"];
                    c.imageUrl = n["imageUrl"];
                    this.categories.push(c);
                });
                this.loading = false;
            }).catch((error) => {
            console.log('Error', error);
            Snackbar.show({
                title: `${error.message}`,
                duration: Snackbar.LENGTH_LONG,
                color: "#fff"
            });
            this.loading = false;
        });
    }

    getAllPlaces() {
      this.loading = true;
      this.client.request(placesQuery)
            .then(result => {
                result["allPlaces"].forEach((n) => {
                    let p = new Place();
                    let locations=[];
                    p.id = n["id"];
                    p.label = n["label"];
                    p.logo = n["logo"];
                    n["locations"].forEach((i) => {
                        let l = new Location();
                        l.id = i["id"];
                        l.latitude = i["latitude"];
                        l.longitude = i["longitude"];
                        l.image=p.logo;
                        l.title=p.label;
                        locations.push(l);
                    });
                    p.locations=locations;
                    const indexFound= this.places.findIndex(item=>item.id === p.id);
                    if(indexFound !== -1){
                        //suppression
                        this.places= this.places.filter((item,index) => index !== indexFound);
                        //console.log('Favoris data :',this.films);
                    }
                        this.places.push(p);

                    //console.log("GraphQl Places data ->", this.places.slice());
                    this.loading = false;
                });
            },(reject)=>{
                console.log('Error', reject);
                Snackbar.show({
                    title: `${reject}`,
                    duration: Snackbar.LENGTH_LONG,
                    color: "#fff"
                });
                this.loading = false;
            }).catch((error) => {
            console.log('Error', error);
            Snackbar.show({
                title: `${error.message}`,
                duration: Snackbar.LENGTH_LONG,
                color: "#fff"
            });
            this.loading = false;
        });
    }

    filterPlacesByLabel(search: String) {
        const variables = {
            search: search,
        };
        this.client.request(filterPlaceByLabel, variables)
            .then(result => {
                console.log("GraphQl Filter Places data ->", result);
                result["allPlaces"].forEach((n) => {
                    let p = new Place();
                    let locations=[];
                    p.id = n["id"];
                    p.label = n["label"];
                    p.logo = n["logo"];
                    n["locations"].forEach((i) => {
                        let l = new Location();
                        l.id = i["id"];
                        l.latitude = i["latitude"];
                        l.longitude = i["longitude"];
                        l.image=p.logo;
                        l.title=p.label;
                        locations.push(l);
                    });
                    p.locations=locations;
                    const indexFound= this.places.findIndex(item=>item.id === p.id);
                    if(indexFound !== -1){
                        //suppression
                        this.places= this.places.filter((item,index) => index !== indexFound);
                        //console.log('Favoris data :',this.films);
                    }
                        this.places.push(p);
                });
                this.loading = false;
            }).catch((error) => {
            console.log('Error', error);
            Snackbar.show({
                title: `${error.message}`,
                duration: Snackbar.LENGTH_LONG,
                color: "#fff"
            });
            this.loading = false;
        });
    }

    filterPlacesByCategoryLabel(search: String) {
        const variables = {
            search: search,
        };
        this.client.request(filterPlaceByCategoryLabel, variables)
            .then(result => {
                console.log("GraphQl Filter Places data ->", result);
                result["allPlaces"].forEach((n) => {
                    let p = new Place();
                    let locations=[];
                    p.id = n["id"];
                    p.label = n["label"];
                    p.logo = n["logo"];
                    n["locations"].forEach((i) => {
                        let l = new Location();
                        l.id = i["id"];
                        l.latitude = i["latitude"];
                        l.longitude = i["longitude"];
                        l.image=p.logo;
                        l.title=p.label;
                        locations.push(l);
                    });
                    p.locations=locations;
                    const indexFound= this.places.findIndex(item=>item.id === p.id);
                    if(indexFound !== -1){
                        //suppression
                        this.places= this.places.filter((item,index) => index !== indexFound);
                        //console.log('Favoris data :',this.films);
                    }
                    this.places.push(p);
                });
                this.loading = false;
            }).catch((error) => {
            console.log('Error', error);
            Snackbar.show({
                title: `${error.message}`,
                duration: Snackbar.LENGTH_LONG,
                color: "#fff"
            });
            this.loading = false;
        });
    }

}

export default new GraphQlStore;