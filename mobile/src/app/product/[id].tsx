import { View, Text, Image } from "react-native";

import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";

import { PRODUCTS } from "@/utils/data/products";

import { formatCurrency } from "@/utils/functions/format-currency";

import { Feather } from "@expo/vector-icons";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

import { useCartStore } from "@/stores/cart-store";

export default function Product() {
    const { id } = useLocalSearchParams();

    const navigation = useNavigation();

    const cartStore = useCartStore();

    const product = PRODUCTS.find((item) => item.id === id);

    function handleAddNewProductToCart() {
        if (product) {
            cartStore.add(product);
            navigation.goBack();
        }
    }

    if (!product) {
        return <Redirect href="/" />;
    }

    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52 rounded-md" resizeMode="cover" />
        
            <View className="mt-8 flex-1">
                <Text className="text-white text-xl font-heading">{product.title}</Text>

                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>

                {product.ingredients.map((ingredient) => (
                    <Text 
                        key={ingredient} 
                        className="text-slate-400 font-body text-base leading-6"
                    >
                        {"\u2022"} {ingredient}
                    </Text>
                ))}

                <View className="pt-8 pb-8 gap-5">
                    <Button onPress={handleAddNewProductToCart}>
                        <Button.Icon>
                            <Feather name="plus-circle" size={20} />
                        </Button.Icon>

                        <Button.Text>
                            Adicionar ao pedido
                        </Button.Text>
                    </Button>

                    <LinkButton title="Voltar ao cardápio" href="/" />
                </View>
            </View>
        </View>
    )
}