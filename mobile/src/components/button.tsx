import { ReactNode } from "react";

import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

interface AddToCardButtonProps extends TouchableOpacityProps {
    children: ReactNode
}

function Button({ children, ...rest }: AddToCardButtonProps) {
    return (
        <TouchableOpacity 
            className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row" 
            activeOpacity={0.7}
        
            {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}

interface ButtonTextProps {
    children: ReactNode
}

function _Text({ children }: ButtonTextProps) {
    return (
        <Text className="text-black font-heading text-base mx-2">
            {children}
        </Text>
    )
}

interface ButtonIconProps {
    children: ReactNode
}

function Icon({ children }: ButtonIconProps) {
    return children;
}

Button.Text = _Text;
Button.Icon = Icon;

export { Button }