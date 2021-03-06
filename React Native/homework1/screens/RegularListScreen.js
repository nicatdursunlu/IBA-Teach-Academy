import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    Alert, 
    AsyncStorage, 
    ScrollView 
} from 'react-native';

import { ShopListCard, CustomText } from '../components';
import { getShopList, deleteList, getData } from '../redux/data';
import { connect } from 'react-redux';
import COLORS from '../styles/colors';
import images from '../styles/images';


const mapStateToProps = (state) => ({
    shopLists: getShopList(state),
    data: getData(state),
});

export const RegularListScreen = connect(mapStateToProps, {
    deleteList
})((props) => {

    const { navigation, shopLists, deleteList, data } = props;

    const deleteListHandler = (shopListID) => {
        Alert.alert(
            "Are you sure you want to delete this list?", 
            "If you delete it, you can not recover it", [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => deleteList({ shopListID }),
                }
            ]
        );
    };

    // useEffect(() => {
    //     AsyncStorage.setItem("data", JSON.stringify(data));
    // }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText weight="medium" style={styles.title}>
                    Regular Lists
                </CustomText>
                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={navigation.toggleDrawer}
                >
                    <Image style={styles.menuIcon} source={images.menu} />
                </TouchableOpacity>
            </View>

            <View style={styles.listWrapper}>
                <ScrollView>
                    <View style={styles.list}>
                        {shopLists
                            .filter((item) => item.type === "regular")
                            .map((item) => (
                                <ShopListCard 
                                    key={item.id} 
                                    item={item}
                                    shopListName={item.title}
                                    shopListID={item.id}
                                    listType="regular"
                                    onLongPress={() => deleteListHandler(item.id)}
                                    onPress={() => navigation.navigate("SingleListScreen", { 
                                            title: item.title ,
                                            shopListID: item.id, 
                                            products: item.products,
                                        })
                                    }
                                />
                        ))}
                    </View> 
                </ScrollView>
            </View>

        </View>
    );
});

const styles= StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        backgroundColor: COLORS.main,
        justifyContent: 'center',
        alignItems: 'center',
        height: 116,
    },
    title: {
        fontSize: 18,
        color: "white",
        textAlign: 'center',
        alignItems: 'center',
       
    },
    menuBtn: {
        position: 'absolute',
        zIndex: 3,
        right: 16,
    },

    listWrapper: {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: -24,
        marginBottom: 100,
    },
    list: {
        margin: 16,
    }
});