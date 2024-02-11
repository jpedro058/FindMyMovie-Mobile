import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
var { width, height } = Dimensions.get("window");

export default function Cast({ cast, navigation }) {
  return (
    <View className="px-4">
      <Text className="text-slate-300 text-xl pb-4">Top Cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {cast.map((actorReq) => (
          <TouchableOpacity
            key={actorReq.id}
            onPress={() => navigation.push("Actor", actorReq)}
          >
            <View className="flex mr-4 items-center">
              <View className="overflow-hidden rounded-full h-24 w-24 items-center">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${actorReq.profile_path}`,
                  }}
                  className="rounded-full border-2 border-gray-300 w-24 h-24"
                />
              </View>
              <Text
                numberOfLines={1}
                className="text-slate-300 text-sm mt-1 max-w-[100px]"
              >
                {actorReq.character}
              </Text>

              <Text
                numberOfLines={1}
                className="text-slate-500 text-sm mt-1 max-w-[100px]"
              >
                {actorReq.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
