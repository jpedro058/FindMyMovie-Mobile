import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../API/apiConf";
import { Menu } from "../components/Menu";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    getTrending();
    getTopRated();
    getUpcoming();
  }, []);

  const getTrending = async () => {
    const data = await fetchTrendingMovies();
    setTrending(data.results);
  };

  const getTopRated = async () => {
    const data = await fetchTopRatedMovies();
    setTopRated(data.results);
  };

  const getUpcoming = async () => {
    const data = await fetchUpcomingMovies();
    setUpComing(data.results);
  };

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView>
        <View className="h-12 w-full px-2  flex flex-row items-center justify-between">
          <TouchableOpacity onPress={() => setMenu(!menu)}>
            <Bars3CenterLeftIcon
              size={40}
              color="#ffffff"
              strokeWidth={2}
              className="flex-1"
            />
          </TouchableOpacity>
          <Text className="text-yellow-600 text-3xl font-bold">
            M<Text className="text-slate-200">ovies</Text>
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon
              size={30}
              color="#ffffff"
              strokeWidth={2}
              className="flex-1"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* toggle menu */}
      <Menu menu={menu} setMenu={setMenu} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} />

        <MovieList text="Upcoming" data={upComing} />

        <MovieList text="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
}
