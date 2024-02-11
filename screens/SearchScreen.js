import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { fetchMovieSearch } from "../API/apiConf";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  const HandleMovieSearch = (search) => {
    if (search && search.length > 2) {
      fetchMovieSearch(search).then((data) => {
        if (data && data.results) {
          setMovies(data.results);
          console.log("Movies", movies);
        }
      });
    } else {
      setMovies([]);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-neutral-900">
      <View className="flex-row justify-between items-center w-[95%] border-2 border-slate-300/70 rounded-full py-3 mt-4">
        <TextInput
          placeholder="Search for Movies"
          placeholderTextColor={"lightgray"}
          className="text-lg  w-full h-full px-4 pb-2 text-slate-200"
          onChangeText={(text) => HandleMovieSearch(text)}
        />

        <TouchableOpacity
          className="absolute right-1 p-3 m-1 bg-slate-600 rounded-full"
          onPress={() => navigation.navigate("Home")}
        >
          {/* absolute right-1 top-1 */}
          <XMarkIcon size={25} color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View className="">
        {movies.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            className="space-3 "
          >
            <View>
              <Text className="text-slate-300 text-xl px-4 pt-4">
                Search Results:
              </Text>
            </View>
            <View className="flex-row justify-around items-center flex-wrap space-y-8 pb-12">
              {movies.map((movie) => (
                <TouchableOpacity
                  key={movie.id}
                  onPress={() => navigation.push("Movie", movie)}
                  className="flex-row"
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }}
                    style={{ width: width * 0.4, height: height * 0.3 }}
                    className="rounded-3xl"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("../assets/images/movieTime.png")}
              style={{ width: width * 0.6, height: height * 0.3 }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
