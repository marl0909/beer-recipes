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

