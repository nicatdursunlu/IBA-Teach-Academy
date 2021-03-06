import React from "react";
import call from "react-native-phone-call";
import { Icon } from "@ui-kitten/components";
import { SocialIcon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";

import { CustomText } from "../components";
import { Container } from "./../commons";

export const AboutScreen = () => {
  const { colors } = useTheme();
  const color = { color: colors.inputText };
  return (
    <Container>
      <CustomText style={{ fontSize: 16, paddingVertical: 20 }}>
        We are non-profit organization that puts the power to save lives in the
        palms of your hand, makes donating blood as much easy for you. You can
        easily post urgent blood need here and find it quickly or you can become
        someone's hero. {"\n"} {"\n"}If you have any comment or question, please
        get in touch with us!
      </CustomText>
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          call({
            number: "(012) 440 65 86",
            prompt: false,
          })
        }
      >
        <Icon name="phone-call" pack="feather" style={[styles.icon, color]} />
        <CustomText>(012) 440 65 86</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          Linking.openURL(
            "mailto:e-donor@gmail.com?subject=Support&body=Description"
          )
        }
      >
        <Icon name="mail" pack="feather" style={[styles.icon, color]} />
        <CustomText>e-donor@gmail.com</CustomText>
      </TouchableOpacity>
      <CustomText weight="bold" style={{ ...styles.text, ...color }}>
        {"\u00A9"} 2020 e-Donor
      </CustomText>
      <View style={[styles.icons, { borderColor: colors.inputText }]}>
        <SocialIcon type="facebook" />
        <SocialIcon type="instagram" />
        <SocialIcon type="linkedin" />
        <SocialIcon type="twitter" />
        <SocialIcon type="youtube" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "70%",
    marginTop: 25,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  icon: {
    height: 23,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  icons: {
    bottom: 25,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    bottom: 10,
    position: "absolute",
  },
});
