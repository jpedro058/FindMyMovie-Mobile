import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import { fetchActorDetails, fetchActorMovies } from "../API/apiConf";

var { width, height } = Dimensions.get("window");

export default function ActorScreen() {
  const navigation = useNavigation();

  const { params: actorReq } = useRoute();
  console.log("Actor ID:", actorReq.id);
  const [liked, setLiked] = useState(false);
  const [actor, setActor] = useState([]);
  const [actorMovies, setActorMovies] = useState([]);

  const setLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    fetchActorDetailsID(actorReq.id);
    fetchActorMoviesID(actorReq.id);
  }, [actorReq]);

  const fetchActorDetailsID = async (id) => {
    const data = await fetchActorDetails(id);
    if (data) {
      setActor({ ...setActor, ...data });
    }
  };

  const fetchActorMoviesID = async (id) => {
    const data = await fetchActorMovies(id);
    if (data) {
      setActorMovies(data.cast);
    }
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View>
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
                color={
                  liked ? "rgba(181, 242, 29, 1)" : "rgba(200, 255, 255, 1)"
                }
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View className="justify-center items-center">
          <View
            className=""
            style={{
              shadowColor: "#dadada",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.5,
              shadowRadius: 50,
              elevation: 0,
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
              }}
              style={{
                width: width * 0.8,
                height: width * 0.8,
              }}
              className="rounded-full mt-10 border-2 border-gray-300/70"
            />
          </View>
          <View className="items-center mt-6">
            <Text className="text-4xl font-semibold text-slate-200 ">
              {actor.name}
            </Text>
            <Text className="font-semibold text-slate-500 ">
              {actor.known_for_department}
            </Text>
          </View>

          <View className="flex-row justify-around items-center mt-6 bg-slate-600/60 w-[95%] mx-4 rounded-full px-4 py-2">
            <View className="flex-row">
              <View className="items-center">
                <Text className="text-slate-300 text-base font-bold">
                  Gender
                </Text>
                <Text className="text-slate-300/80 text-sm font-semibold">
                  {actor.gender === 2 ? "Male" : "Female"}
                </Text>
              </View>
            </View>
            <Text className="text-slate-400 text-5xl font-light">|</Text>
            <View className=" items-center">
              <Text className="text-slate-300 text-base font-bold">
                Birthday
              </Text>
              <Text className="text-slate-300/80 text-sm font-semibold">
                {actor.birthday}
              </Text>
            </View>
            <Text className="text-slate-400 text-5xl font-light">|</Text>
            <View className=" items-center">
              <Text className="text-slate-300 text-base font-bold ">
                Known for
              </Text>
              <Text className="text-slate-300/80 text-sm font-semibold">
                {actor.known_for_department}
              </Text>
            </View>
            <Text className="text-slate-400 text-5xl font-light">|</Text>
            <View className=" items-center">
              <Text className="text-slate-300 text-base font-bold">
                Popularity
              </Text>
              <Text className="text-slate-300/80 text-sm font-semibold">
                {actor.popularity}%
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 pb-8 px-4">
          <Text className="text-slate-300 text-xl pb-4 font-bold">
            Biography
          </Text>
          <Text className="text-slate-300/80 text-sm">{actor.biography}</Text>
        </View>
      </View>

      <View className="px-4">
        <MovieList text="Movies" data={actorMovies} />
      </View>
    </ScrollView>
  );
}
