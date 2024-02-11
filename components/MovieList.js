import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

export default function MovieList({ text, data }) {
  const navigation = useNavigation();
  return (
    <View className="px-4 space-y-4 mb-8">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-slate-300 text-xl ">{text}</Text>

        {/* <TouchableWithoutFeedback>
          <Text className="text-yellow-600 text-lg font-bold">See All</Text>
        </TouchableWithoutFeedback> */}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.push("Movie", item)}
            key={item.id}
          >
            <View className="flex pr-4">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
                className="rounded-3xl"
              />
              <Text
                numberOfLines={1}
                className="text-slate-300 text-sm mt-1 max-w-[135px]"
              >
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
