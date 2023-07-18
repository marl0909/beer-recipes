import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export const useList = create(devtools(persist((set, get) => ({
    list: [],
    rendered: [],
    page: 1,
    error: null,
    fetchList: async () => {
        try {
            const res = await fetch(`https://api.punkapi.com/v2/beers?page=${get().page}`);

            if (!res.ok) throw new Error('Failed to fetch! Try again.');

            const recipes = await res.json();
            if (recipes.length) {
                set({list: recipes})
                set({error: null});
            } else throw new Error('Recipes are over!');
        } catch (err) {
            set({error: err.message})
        }
    },
    updateRenderedList: async (lastId, amountNumber) => {
        let list = get().list;
        let returnRecipes = [];
        for (let i = 1; i < amountNumber + 1; i++) {
            const recipe = list.find(recipe => recipe.id === lastId + i)
            if (recipe) returnRecipes.push(recipe);
            else {
                if (get().error) {
                    set({page: 1});
                    lastId = 0;
                } else set({page: get().page + 1});
                await get().fetchList();
                list = get().list;
                i--;
            }
        }
        return returnRecipes
    },
    saveRenderedRecipes: (recipes) => {
        set({rendered: recipes});
    }
}), {
    name: 'favoritwe',
    storage: createJSONStorage(() => localStorage)
})));

export const useSelect = create(devtools((set, get) => ({
    selectedRecipes: [],
    checkSelected: () => {
        return get().selectedRecipes.length;
    },
    selectRecipe: (recipeId) => {
        set({selectedRecipes: [...get().selectedRecipes, Number(recipeId)]});
    },
    unselectRecipe: (recipeId) => {
        set({selectedRecipes: get().selectedRecipes.filter(id => id !== Number(recipeId))});
    },
    unselectAllRecipes: () => {
        set({selectedRecipes: []});
    },
    clearWasteRecipes: (firstId) => {
        for (let i = firstId; i < firstId + 5; i++) {
            get().unselectRecipe(i);
        }
    }
})))

export const useRecipe = create(persist((set, get) => ({
    recipe: null,
    setRecipe: (recipe) => {
        set({recipe: recipe});
        console.log('store', get().recipe)
    },
}), {
    name: 'favoritesStorage',
    storage: createJSONStorage(() => localStorage)
}))


// export const useDelete = create(devtools((set, get) => ({
//     isSelected: false,
//     setIsSelected: () => {
//         set({isSelected: });
//     }
// })))
// {
//     id: 301,
//         name: "Small Batch: Dry-hopped Pilsner",
//     tagline: "Dry-hopped lager.",
//     first_brewed: "2018",
//     description: "A BrewDog bar exclusive draft lager, brewed with Weihenstephan's lager yeast, and dry-hopped with the contemporary German variety Saphir; this lager has been lightly centrifuged and packaged at just under 28 days in tank.",
//     image_url: "https://images.punkapi.com/v2/keg.png",
//     abv: 4.7,
//     ibu: 37,
//     target_fg: 1006,
//     target_og: 1042,
//     ebc: 5,
//     srm: 3,
//     ph: 4.4,
//     attenuation_level: 86,
//     volume: {
//     value: 20,
//         unit: "litres"
// },
//     boil_volume: {
//         value: 25,
//             unit: "litres"
//     },
//     method: {
//         mash_temp: [
//             {
//                 temp: {
//                     value: 65,
//                     unit: "celsius"
//                 },
//                 duration: 50
//             }
//         ],
//             fermentation: {
//             temp: {
//                 value: 11,
//                     unit: "celsius"
//             }
//         },
//         twist: null
//     },
//     ingredients: {
//         malt: [
//             {
//                 name: "Pilsner",
//                 amount: {
//                     value: 3.36,
//                     unit: "kilograms"
//                 }
//             },
//             {
//                 name: "Carapils",
//                 amount: {
//                     value: 0.24,
//                     unit: "kilograms"
//                 }
//             }
//         ],
//             hops: [
//             {
//                 name: "Magnum",
//                 amount: {
//                     value: 12,
//                     unit: "grams"
//                 },
//                 add: "70",
//                 attribute: "Bittering"
//             },
//             {
//                 name: "Spalter",
//                 amount: {
//                     value: 15,
//                     unit: "grams"
//                 },
//                 add: "30",
//                 attribute: "Flavour"
//             },
//             {
//                 name: "Spalter",
//                 amount: {
//                     value: 15,
//                     unit: "grams"
//                 },
//                 add: "10",
//                 attribute: "Flavour"
//             },
//             {
//                 name: "Saphire",
//                 amount: {
//                     value: 30,
//                     unit: "grams"
//                 },
//                 add: "0",
//                 attribute: "Aroma"
//             },
//             {
//                 name: "Saphire",
//                 amount: {
//                     value: 30,
//                     unit: "grams"
//                 },
//                 add: "Dry Hop",
//                 attribute: "Aroma"
//             }
//         ],
//             yeast: "Saflager W-34/70"
//     },
//     food_pairing: [
//         "Grilled salmon tacos",
//         "Chicken and pesto pasta",
//         "Ham and mustard crisps"
//     ],
//         brewers_tips: "Before dry hopping, if you aren't happy with the \"green\" beer, drink it (or dump it) and make a new one to avoid wasting your premium hops on something flawed.,
//     contributed_by: "John Jenkman <johnjenkman>"
// }

