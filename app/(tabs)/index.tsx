import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import React from "react";

export default function HomeScreen() {
  const [word, setWord] = useState<string>("word");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (word) {
      setLoading(true);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setData(data);
            setLoading(false);
            setHistory([...history, word]);
          } else {
            alert("No data");
          }
        });
    }
  }, [word]);
  const handleSubmit = (item: string) => {
    setWord(item);
  };
  return (
    //  Main Layout

    <View
      style={{
        flex: 1,
        backgroundColor: "lightpink",
        flexDirection: "column",
        paddingTop: 50,
        paddingBottom: 100,
        gap: 10,
        borderWidth: 4,
        borderColor: "lightgrey",
      }}
    >
      {/* search bar for workds */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          gap: 2,
        }}
      >
        {/* move backword */}
        <Pressable
          style={({ pressed }) => [
            {
              paddingHorizontal: 4,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "lightgreen" : "grey",
            },
          ]}
          onPress={() => {
            if (history?.length === 0) {
              alert("No more words.");
            } else {
              history?.pop();
              const lastWord = history?.pop();
              setHistory([...history]);
              setWord(lastWord);
            }
          }}
          android_ripple={{ color: "#ffffff" }}
        >
          <MaterialIcons name="arrow-back" size={30} color="white" />
        </Pressable>
        {/* <Pressable
          style={({ pressed }) => [
            {
              paddingHorizontal: 4,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "lightgreen" : "grey",
            },
          ]}
          onPress={() => {
            const lastWord = history?.pop();
            setHistory([...history]);
            setWord(lastWord);
            handleSubmit();
          }}
          android_ripple={{ color: "#ffffff" }}
        >
          <MaterialIcons name="arrow-forward" size={30} color="white" />
        </Pressable> */}
        {/* write word to search */}
        <TextInput
          style={{
            flex: 4,
            height: 60,
            borderColor: "lightgray",
            borderRadius: 4,
            borderWidth: 1,
            fontSize: 26,
            color: "black",
            backgroundColor: "lightblue",
            paddingLeft: 10,
            textAlignVertical: "center",
          }}
          onChangeText={(text) => setWord(text)}
          value={word}
        />
        {/* search word */}
        <Pressable
          style={({ pressed }) => [
            {
              paddingHorizontal: 4,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "lightgreen" : "lime",
            },
          ]}
          onPress={() => {
            handleSubmit(word);
          }}
          android_ripple={{ color: "#ffffff" }}
        >
          <MaterialIcons name="search" size={50} color="white" />
        </Pressable>
      </View>
      {/* Synonyms + Accesnt + Meanings */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="lime" />
        </View>
      ) : (
        <View
          style={{
            paddingBottom: 12,
            borderColor: "red",
            borderRadius: "4",
            marginHorizontal: 12,
          }}
        >
          {/* synonyms */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 4,
              gap: 8,
            }}
          >
            {data?.map((item: any) =>
              item?.meanings?.map((item: any) =>
                item?.synonyms?.map((item: string, idx: number) => (
                  <View
                    key={idx}
                    style={{
                      borderColor: "white",
                      borderWidth: 1,
                      borderRadius: 4,
                      backgroundColor: "lightgray",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                      }}
                      onPress={() => {
                        setWord(item);
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))
              )
            )}
            {/* accents */}
          </View>
          {/* phonetics */}
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: 10,
              borderRadius: 4,
              marginTop: 4,
            }}
          >
            {data.map((item: any) =>
              item?.phonetics?.map((phonetic: any, idx: number) => (
                <Text
                  key={idx}
                  style={{
                    fontSize: 18,
                    color: "black",
                    marginRight: 10,
                  }}
                >
                  {"•" + " " + phonetic?.text}
                </Text>
              ))
            )}
          </View>
          {/* meanings */}
          <ScrollView
            style={{
              marginTop: 8,
              borderWidth: 2,
              borderColor: "lightgrey",
              paddingHorizontal: 2,
              backgroundColor: "lightblue",
              borderRadius: 4,
              marginBottom: 110,
            }}
          >
            <View>
              {data?.map((item) =>
                item?.meanings?.map((item: any) => (
                  <>
                    {/* part of speech */}
                    <View style={{ marginBottom: 4 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Roboto-Bold",
                          fontWeight: "bold",
                          marginLeft: 2,
                        }}
                      >
                        {item?.partOfSpeech}
                      </Text>
                    </View>
                    {/* definition */}
                    <View style={{ marginBottom: 10 }}>
                      {item?.definitions?.map((item: any) => (
                        <View
                          style={{
                            marginBottom: 8,
                            paddingHorizontal: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: "Roboto-Bold",
                            }}
                          >
                            {"• " + item?.definition}
                          </Text>
                          {item?.example && (
                            <Text
                              style={{
                                color: "white",
                                backgroundColor: "black",
                                paddingHorizontal: 4,
                                paddingVertical: 1,
                                fontFamily: "Roboto-Bold",
                                fontSize: 16,
                                fontWeight: "regular",
                              }}
                            >
                              {item?.example}
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// <ParallaxScrollView
//   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//   headerImage={
//     <Image
//       source={require("@/assets/images/partial-react-logo.png")}
//       style={styles.reactLogo}
//     />
//   }
// >
//   <ThemedView style={styles.titleContainer}>
//     <ThemedText type="title">Welcome! How are you?</ThemedText>
//     <HelloWave />
//   </ThemedView>
//   <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//     <ThemedText>
//       Edit{" "}
//       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//       to see changes. Press{" "}
//       <ThemedText type="defaultSemiBold">
//         {Platform.select({
//           ios: "cmd + d",
//           android: "cmd + m",
//           web: "F12",
//         })}
//       </ThemedText>{" "}
//       to open developer tools.
//     </ThemedText>
//   </ThemedView>
//   <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//     <ThemedText>
//       Tap the Explore tab to learn more about what's included in this
//       starter app.
//     </ThemedText>
//   </ThemedView>
//   <ThemedView style={styles.stepContainer}>
//     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//     <ThemedText>
//       When you're ready, run{" "}
//       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
//       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//       directory. This will move the current{" "}
//       <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//     </ThemedText>
//   </ThemedView>
// </ParallaxScrollView>

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5", // Background color
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
