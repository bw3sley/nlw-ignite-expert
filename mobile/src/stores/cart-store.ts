import { create } from "zustand";

import { ProductProps } from "@/utils/data/products";

import * as CartInMemory from "./helpers/cart-in-memory";

import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ProductCartProps extends ProductProps {
    quantity: number
}

interface StateProps {
    products: ProductCartProps[],

    add: (product: ProductProps) => void,
    remove: (productId: string) => void,
    clear: () => void
}

export const useCartStore = create(persist<StateProps>((set) => ({
    products: [],

    add: (product: ProductProps) => set((state) => ({
        products: CartInMemory.add(state.products, product)
    })),

    remove: (productId: string) => set((state) => ({
        products: CartInMemory.remove(state.products, productId)
    })),

    clear: () => set(() => ({ products: [] }))
}), {
    name: "@nlw-expert:cart",
    storage: createJSONStorage(() => AsyncStorage)
}))