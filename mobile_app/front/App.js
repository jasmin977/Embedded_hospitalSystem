import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";

import {
  ScrollView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { scrollInterpolator, animatedStyles } from "./utils/animations";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = [
  {
    name: "Médecine Générale",
    img: "https://www.mesopinions.com/public/img/survey/sondage-img-11119-fr.png",
  },
  {
    name: "Immunologie",
    img: "https://www.usherbrooke.ca/dep-immunologie-biologie-cellulaire/fileadmin/_processed_/e/b/csm_immunologie_2078d27ee6.jpg",
  },
  {
    name: "Radiologie",
    img: "https://www.medespoir.org/assets/img/chirurgie/radiologie-tunisie.jpg",
  },
  {
    name: "Chirurgie",
    img: "https://www.lachirurgieesthetique.org/images/chirurgie-esthetique/chirurgie-esthetique.jpg",
  },
  {
    name: "Cardiologie",
    img: "https://www.macsf.fr/var/macsf/storage/images/macsf.fr/responsabilite-professionnelle/actes-de-soins-et-technique-medicale/chirurgie-versus-cardiologie-interventionnelle/590418-2-fre-FR/Chirurgie-versus-cardiologie-interventionnelle.jpg",
  },
  {
    name: "Neurologie",
    img: "https://www.erasme.ulb.ac.be/sites/default/files/styles/large/public/images/articles/2016/neuro_pres_521x293.png?itok=wWaZpyai",
  },

  {
    name: "Pneumologie",
    img: "https://www.toomed.com/blog/wp-content/uploads/2019/10/pneumo-copie.jpg",
  },
  {
    name: "Dermatologie",
    img: "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fsante.2Fsante-pratique.2Fdermatologie-bobos-ete-a-soigner-37735.2F14485603-1-fre-FR.2Fdermatologie-les-bobos-de-la-peau-a-soigner-avant-l-ete.2Ejpg/1200x600/quality/80/crop-from/center/dermatologie-les-bobos-de-la-peau-a-soigner-avant-l-ete.jpeg",
  },
  {
    name: "Odontologie",
    img: "https://img.passeportsante.net/1200x675/2021-05-03/i103774-odontologie.jpg",
  },
  {
    name: "Hématologie",
    img: "https://asset.lemde.fr/prd-blogs/2021/10/b6f75317-hemophilie-a-acquise-hemophile-coagulation-sanguine-sang-cas-clinique-hematologie.jpg",
  },
  {
    name: "Gastro-entérologie",
    img: "https://www.elsan.care/sites/default/files/inline-images/gastroenterologie%20%28Personnalis%C3%A9%29.jpg",
  },
  {
    name: "Maternité",
    img: "https://cache.magicmaman.com/data/photo/w1000_ci/5f/choix-maternite.jpg",
  },
  {
    name: "Pédiatrie",
    img: "https://file1.topsante.com/var/topsante/storage/images/maman-et-enfant/bebe/sante-de-bebe/premiere-plateforme-de-teleconseil-en-pediatrie-613492/8715103-1-fre-FR/Premiere-plateforme-de-teleconseil-en-pediatrie.jpg?alias=width400&size=x100&format=jpeg",
  },
];

export default function App() {
  const [index, setindex] = useState(0);
  const [allPatients, setAllPatients] = useState(0);
  const [lights, setLights] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [patients, setPatients] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    setInterval(
      () =>
        fetch("http://192.168.1.20:5000/status?_id=123456")
          .then((res) => res.json())
          .then((data) => {
            let temp = [...patients];
            temp[3] = data.status.motionCounter;
            setPatients(temp);
            console.log(data.status.motionCounter);
          })
          .catch((err) => console.log(err)),
      4000
    );
  }, []);

  const newPatient = () => {
    let newpatients = [...patients];
    newpatients[index]++;

    setPatients(newpatients);
  };

  function percentage(num) {
    if (num == 0) {
      return 0;
    } else
      return parseInt(
        (num /
          patients.reduce((x, y) => {
            return x + y;
          }, 0)) *
          100
      );
  }

  const lightService = () => {
    let changeLight = [...lights];
    if (changeLight[index]) {
      // ken service yech3el
      changeLight[index] = false; // tafi dhaw

      let patients_status = [...patients];
      patients_status[index] = 0; //5araj nes

      setPatients(patients_status);
    } else {
      changeLight[index] = true; // sha3al dhaw service
    }

    setLights(changeLight);
  };

  useEffect(() => {
    if (patients[index] == 0) {
      let changeLight = [...lights];
      changeLight[index] = false;
      setLights(changeLight);
    } else if (lights[index] == false && patients[index] != 0) {
      let changeLight = [...lights];
      changeLight[index] = true;
      setLights(changeLight);
    }
  }, [patients]);

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{
          uri: `${item.img}`,
        }}
        style={{
          width: Math.round(SLIDER_WIDTH * 0.79),
          height: 250,

          alignItems: "baseline",
          justifyContent: "flex-end",
        }}
      ></ImageBackground>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      <ScrollView bounces={true}>
        <View
          style={{
            width: "100%",
            height: 120,
            backgroundColor: "#00B3B3",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 40,
              marginTop: -30,
              backgroundColor: "#006666",
              flexDirection: "row",
            }}
          ></View>

          <View
            style={{
              width: "100%",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="menu-sharp"
              size={40}
              color="white"
              style={{ top: 15, left: -18 }}
            />

            <Image
              source={require("./img/logo.png")}
              style={{
                width: 280,
                height: 60,
                top: 10,
                right: 10,
                tintColor: "white",
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
        <View>
          {/**************************************************** */}
          <ImageBackground
            source={{
              uri: `${DATA[index].img}`,
            }}
            blurRadius={5}
            style={{
              width: Math.round(SLIDER_WIDTH * 1),
              height: 320,

              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
          >
            <Carousel
              layout={"default"}
              data={DATA}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              containerCustomStyle={styles.carouselContainer}
              inactiveSlideShift={0}
              onSnapToItem={(index) => setindex(index)}
              scrollInterpolator={scrollInterpolator}
              slideInterpolatedStyle={animatedStyles}
              useScrollView={true}
            />
          </ImageBackground>

          {/*********************************************** */}

          <View
            style={{
              width: 280,
              flex: 1,
              height: 130,
              margin: 10,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={lightService}
              style={{
                width: 130,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 10,
                margin: 8,
                borderColor: lights[index] ? "#00FFFF" : "transparent",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              {lights[index] ? (
                <>
                  <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={60}
                    color="rgba(0,255,255,0.9)"
                  />
                  <Text
                    style={{
                      color: "rgba(0,255,255,0.9)",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    ON
                  </Text>
                </>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="lightbulb-outline"
                    size={60}
                    color="white"
                  />
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    OFF
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={newPatient}
              style={{
                width: 130,
                height: "100%",
                margin: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: 0.4,
              }}
            >
              <Image
                style={{
                  width: 150,
                  marginTop: -40,
                  height: 150,
                  tintColor:
                    patients[index] == 0 ? "grey" : "rgba(0, 179, 179, 0.9)",
                }}
                resizeMode="center"
                source={require("./img/patient.jpg")}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: -40,
                  fontWeight: "bold",
                  color:
                    patients[index] == 0 ? "grey" : "rgba(0, 179, 179, 0.9)",
                }}
              >
                {patients[index]} patient
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              marginHorizontal: 10,
            }}
          >
            <Ionicons
              name="bar-chart-outline"
              size={30}
              color="grey"
              style={{ marginTop: 7 }}
            />
            <Text
              style={{
                fontSize: 25,
                margin: 10,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Statistics
            </Text>
          </View>
          <FlatList
            data={patients}
            numColumns={3}
            keyExtractor={() => Math.floor(Math.random() * 1000)}
            renderItem={(service, i) => (
              <View style={{ margin: 8, left: 7, alignSelf: "center" }}>
                <ProgressCircle
                  key={i}
                  percent={percentage(service.item)}
                  radius={50}
                  borderWidth={7}
                  color="#00B3B3"
                  shadowColor="#b3c4c0"
                  bgColor="#DCDCDC"
                >
                  <Text
                    style={{
                      fontSize: 24,
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
                    {percentage(service.item)}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "grey",
                      fontWeight: "800",
                    }}
                  >
                    {DATA[service.index].name}
                  </Text>
                </ProgressCircle>
              </View>
            )}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScrollView style={{ height: 300 }} horizontal={true}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  top: 10,
                  left: 0,
                  tintColor: "rgba(0, 179, 179, 0.2)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
              <Image
                style={{
                  width: 150,
                  height: 150,
                  top: 10,
                  left: -20,

                  tintColor: "rgba(0, 179, 179, 0.4)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
              <Image
                style={{
                  width: 150,
                  height: 150,
                  top: 10,
                  left: -40,

                  tintColor: "rgba(0, 179, 179, 0.2)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
              <Image
                style={{
                  width: 150,
                  top: 125,
                  left: -385,
                  height: 150,
                  tintColor: "rgba(0, 179, 179, 0.6)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
              <Image
                style={{
                  width: 150,
                  top: 125,
                  left: -405,
                  height: 150,
                  tintColor: "rgba(0, 179, 179, 0.2)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
              <Image
                style={{
                  width: 150,
                  top: 125,
                  left: -425,
                  height: 150,
                  tintColor: "rgba(0, 179, 179, 0.5)",
                }}
                resizeMode="center"
                source={require("./img/hex.png")}
              />
            </ScrollView>
            <Text
              style={{
                color: "rgba(0, 179, 179, 1)",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Powered by Yasmin & Samar
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,

    height: 250,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 0.4,
  },
  itemLabel: {
    color: "white",
    fontSize: 27,
    fontWeight: "900",
  },
  counter: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 500,
  },
});
