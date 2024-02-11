import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Carousel from "react-native-new-snap-carousel";

import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="my-8">
      <Text className="text-slate-200 text-xl px-2 mb-5">Trending</Text>
      <Carousel
        firstItem={1}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemWidth={width * 0.6}
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClick(item);
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
