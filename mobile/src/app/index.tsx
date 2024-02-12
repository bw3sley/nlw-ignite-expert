import { useState, useRef } from "react";

import { Text, View, FlatList, SectionList } from "react-native";

import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

import { Product } from "@/components/product";

import { useCartStore } from "@/stores/cart-store";
import { Link } from "expo-router";

export default function Home() {
    const cartStore = useCartStore();

    const [category, setCategory] = useState(CATEGORIES[0]);

    const sectionListRef = useRef<SectionList<ProductProps>>(null);

    const cartItemsAmount = cartStore.products.reduce((total, product) => total + product.quantity, 0);

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        } 
    }

    return (
        <View className="flex-1 bg-slate-900">
            <Header title="Faça seu pedido" quantity={cartItemsAmount} />
        
            <FlatList 
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => ( <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} /> )}
                horizontal
                className="max-h-16 mt-5"
                contentContainerStyle={{ gap: 12 }}
                showsHorizontalScrollIndicator={false}
            />

            <SectionList 
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => ( <Link href={`/product/${item.id}`} asChild><Product data={item} id={item.id} /></Link> )}
                renderSectionHeader={({ section: { title } }) => ( <Text className="text-xl text-white font-heading mt-2 mb-3">{title}</Text> )}
                className="flex-1"
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}