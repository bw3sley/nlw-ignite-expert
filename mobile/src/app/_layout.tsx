import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Slot } from "expo-router";

import { 
    useFonts, 

    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from "@expo-google-fonts/inter";

import { Loading } from "@/components/loading";

export default function Layout() {
    const insets = useSafeAreaInsets();

    const [haveFontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
    })

    if (!haveFontsLoaded) {
        return <Loading />
    }

    return (
        <SafeAreaView 
            className="flex-1 bg-slate-900 px-6 py-8"

            // style={{ paddingBottom: insets.bottom }}
        >
            <Slot />
        </SafeAreaView>
    )
}