import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import {
  fetchMovieDetails,
  fetchCast,
  fetchSimilarMovies,
} from "../API/apiConf";

var { width, height } = Dimensions.get("window");
export default function MovieScreen() {
  const { params: item } = useRoute();

  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  console.log("item id", item.id);

  /* const setLike = () => {
    setLiked(!liked);
  };
 */
  useEffect(() => {
    fetchMovieDetailsID(item.id);
    fetchCastID(item.id);
    fetchSimilarMoviesID(item.id);
  }, [item]);

  const fetchMovieDetailsID = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovieDetails({ ...movieDetails, ...data });
    }
  };

  const fetchCastID = async (id) => {
    const data = await fetchCast(id);
    setCast(data.cast);
  };

  const fetchSimilarMoviesID = async (id) => {
    const data = await fetchSimilarMovies(id);
    setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView>
        <View className="flex-row px-6 justify-between">
          <TouchableOpacity
            className="bg-yellow-500/70 rounded-xl p-1 flex justify-center items-center"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={30} color="#ffffff" strokeWidth={5} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLike()}>
            <HeartIcon
              size={40}
              strokeWidth={2}
              color={liked ? "rgba(181, 242, 29, 1)" : "rgba(200, 255, 255, 1)"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View className="absolute -z-10">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={{ width, height: height * 0.55 }}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.8)",
            "rgba(23, 23, 23, 1)",
          ]}
          style={{ width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>

      {/* Movie Details */}
      <View
        style={{ paddingTop: height * 0.35 }}
        className="flex-1 justify-center items-center space-y-4 mt-2 px-8"
      >
        <Text className="text-slate-100 text-4xl font-semibold  text-center">
          {movieDetails.title}
        </Text>
        <Text className="text-slate-300 text-center">
          {/* Released * 2023 * 100min */}
          {movieDetails.status} | {movieDetails.release_date} |{" "}
          {movieDetails.runtime}min
        </Text>
        <Text className="text-slate-300 text-center">
          {movieDetails.genres?.map((genre) => genre.name).join(", ")}
        </Text>
      </View>

      {/* Movie Description */}
      <View className="pt-4">
        <Text className="text-slate-300 px-4">{movieDetails.overview}</Text>
      </View>

      {/* Movie Cast */}
      <View className="pt-4">
        <Cast cast={cast} navigation={navigation} />
      </View>

      {/* Similar Movies */}
      <View className="pt-6">
        <MovieList text="Similar Movies" data={similarMovies} />
      </View>
    </ScrollView>
  );
}
