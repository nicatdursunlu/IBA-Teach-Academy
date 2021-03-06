import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,  
    TouchableWithoutFeedback, 
    Keyboard,
    Image,
    Alert, 
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import { 
    CustomText, 
    CustomField, 
    CustonButton,
    ProductsCard,  
    RadioGroup,
    CountField
} from '../components';
import { 
    getShopList, 
    addProduct, 
    deleteProduct, 
    updateProduct, 
    getData 
} from '../redux/data';
import images from '../styles/images';
import COLORS from '../styles/colors';
import { getWidthByPercents } from '../utils/getWidthByPercents';
import { Container } from '../commons';

const mapStateToProps = (state) => ({
    shopLists: getShopList(state),
    data: getData(state),
});

const singleProductEditInitialState = {
    status: false,
    product: {},
};

export const AddProductToListScreen = connect(mapStateToProps, {
    addProduct,
    deleteProduct,
    updateProduct,
})((props) => {

    const { 
        navigation, 
        shopLists, 
        route, 
        addProduct, 
        deleteProduct, 
        updateProduct, 
    } = props;

    const { singleList } = route.params;
    const { products } = shopLists.find((item) => item.id === singleList?.id);

    const UNIT = ["pkg", "kg", "litre", "bott"];
    const fieldsInitialState = {
        name: "",
        count: 1,
        unit: UNIT[0],
    };
    const [fields, setFields] = useState(fieldsInitialState);

    const fieldChangeHandler = (name, value) => {
        setFields((fields) => ({
        ...fields,
        [name]: value,
        }));
    };

    const [singleProductEditState, setSingleProductEditState] = useState(
        singleProductEditInitialState
    );


    const validateForm = () => {
        if(fields.name.trim() === '') {
          Alert.alert("Name is empty", "Name is required");
          return false;
        }
        else if(fields.count < 1) {
          Alert.alert("Count is low", "Set minimum 1");
          return false;
        }
        return true;
    };

    const addToListBtnHandler = () => {
        if(validateForm()) {
            addProduct({ ...fields, shopListID: singleList.id });
            setFields(fieldsInitialState);
        }
    };

    const deleteBtnHandler = (productID) => {

        const args = {
            shopListID: singleList.id,
            productID
        };

        Alert.alert(
            "Are you sure you want to delete this product?", 
            "If you delete it, you can not recover it", [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => deleteProduct(args),
                }
            ]
        );
    };

    const initSingleProductEdit = (product) => 
        setSingleProductEditState({
            status: true,
            product,
        });

    const finishSingleProductEdit = () => 
        setSingleProductEditState(singleProductEditInitialState);

    const cancelBtnHandler = () => {
        setFields(fieldsInitialState);
        finishSingleProductEdit();
    };

    const updateBtnHandler = () => {
        if(validateForm()) {
            updateProduct({ product: fields, shopListID: singleList.id });
            cancelBtnHandler();  
        }
    };

    useEffect(() => {
        if(singleProductEditState.status) {
            setFields(singleProductEditState.product)
        }
    }, [singleProductEditState]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.horizontal}>
                        <View style={[styles.row, styles.marginTop]}>
                            <CustomField 
                                title="position name"
                                value={fields.name}
                                placeholder="product name"
                                onChangeText={(value) => fieldChangeHandler("name", value)}
                                contentContainerStyle={{ width: getWidthByPercents(75, 3) }} 
                            />
                            <CountField 
                                title="count" 
                                value={fields.count}
                                contentContainerStyle={{ width: getWidthByPercents(25, 3) }}
                                onChangeText={(value) => fieldChangeHandler("count", value)}
                            />
                        </View>    
                        <RadioGroup 
                            value={fields.unit} 
                            onValueChange={(value) => fieldChangeHandler("unit", value)} 
                            contentContainerStyle={styles.types} 
                            options={UNIT} 
                        />
                        {!singleProductEditState.status ? (
                            <CustonButton 
                                title="Add to list"
                                style={styles.addBtn} 
                                onPress={addToListBtnHandler}
                            />  
                        ) : ( 
                            <View style={styles.editBtnsWrapper}>
                                <CustonButton 
                                    title="Cancel" 
                                    style={styles.cancelBtn} 
                                    onPress={cancelBtnHandler}
                                />
                                <CustonButton 
                                    title="Update" 
                                    style={styles.updateBtn}
                                    onPress={updateBtnHandler} 
                                />
                            </View> 
                        )}
                    </View> 
                    
                </View>
                <View style={styles.border}/>
                <ProductsCard 
                    products={products} 
                    deleteProduct={deleteBtnHandler}
                    editProduct={initSingleProductEdit}
                    singleProductEditState={singleProductEditState}
                />
            </Container>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    types: {
        marginVertical: 14,
    },
    horizontal: {
        marginHorizontal: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    marginTop: {
        marginTop: 15,
    },
    addBtn : {
        width: "100%",
        backgroundColor: COLORS.main,
    },
    editBtnsWrapper: {
        flexDirection: 'row',
    },
    cancelBtn: {
        width: "47%",
        backgroundColor: COLORS.main,
        marginRight: 22,
        opacity: 0.5,
    },
    updateBtn: {
        width: "47%",
        backgroundColor: COLORS.main,
    },
    border: {
        marginTop: 21,
        marginBottom: 33,
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 2,
    }
});