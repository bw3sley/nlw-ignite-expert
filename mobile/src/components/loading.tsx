import { ActivityIndicator, View } from "react-native";

import colors from "tailwindcss/colors";

export function Loading() {
    return (
        <View className="bg-slate-900 flex-1 items-center justify-center">
            <ActivityIndicator color={colors.white} />
        </View>
    )
}