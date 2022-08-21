import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import information from '../assets/information.png';

type PopupProps = {
    message: string;
    status: string;
}

const Popup = ({ message, status }: PopupProps) => {
    return (
        <Menu>
            <MenuTrigger style={styles.menuTrigger} testID={`${status}MenuTrigger`}>
                <Image accessibilityLabel={`${status}Icon`} source={information} style={styles.imageIcon} />
            </MenuTrigger>

            <MenuOptions>
                <MenuOption key="info" text={message} />
            </MenuOptions>
        </Menu>
    )  
}

const styles = StyleSheet.create({
    menuTrigger: {
        height: 15,
        width: 15,
        alignItems: 'center',
        marginLeft: 10,
        top: 1,
    },
    imageIcon: {
        height: 15,
        width: 15,
        tintColor: 'blue',
    },
})

export default Popup