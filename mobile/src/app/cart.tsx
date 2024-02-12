import { useState } from "react";

import { Alert, ScrollView, Text, View, Linking } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Feather } from "@expo/vector-icons";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { formatCurrency } from "@/utils/functions/format-currency";

import { useNavigation } from "expo-router";

const PHONE_NUMBER = "55DD00000000";

export default function Cart() {
    const [address, setAddress] = useState("");

    const navigation = useNavigation();

    const cartStore = useCartStore();
    
    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

    function handleProductRemove(product: ProductCartProps) {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar"
            },

            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ]);
    }

    function handleNewOrderAddress() {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega.");
        }

        const products = cartStore.products.map((product) => `\n - ${product.quantity} ${product.title}`).join("");

        const message = `
🍔 NOVO PEDIDO!
        \n Entregar em: _${address}_

        ${products}

        \n Valor total: *${total}*
        `

        // Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

        cartStore.clear();

        navigation.goBack();
    }

    return (
        <View className="flex-1">
            <Header title="Seu carrinho" />

            <KeyboardAwareScrollView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="py-5 flex-1">
                        {cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">
                                {cartStore.products.map((product) => (
                                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                                ))}
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho está vazio.
                            </Text>
                        )}

                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total:</Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>

                        <Input 
                            className="placeholder:"
                            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."

                            onSubmitEditing={handleNewOrderAddress}
                            blurOnSubmit={true}
                            onChangeText={setAddress}

                            returnKeyType="next"
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="py-5 gap-5">
                <Button onPress={handleNewOrderAddress}>
                    <Button.Text>Enviar pedido</Button.Text>
                    
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}