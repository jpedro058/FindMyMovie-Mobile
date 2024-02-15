import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

export function Menu({ menu, setMenu }) {
  const navigation = useNavigation();

  return (
    <View
      className={`absolute bg-neutral-900 z-50 top-24 p-2 pt-4   
        ${menu ? "" : "-left-full"}`}
      style={{
        width: width / 2,
        height: height,
        transitionProperty: "transform",
        transitionDuration: "300ms",
        transitionTimingFunction: "ease-out",
        gap: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="p-2 border-b border-slate-400/70"
      >
        <Text className="text-white text-2xl">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        className="p-2 border-b border-slate-400/70"
      >
        <Text className="text-white text-2xl">Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Favorites")}
        className="p-2 border-b border-slate-400/70"
      >
        <Text className="text-white text-2xl">Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Movies")}
        className="p-2 border-b border-slate-400/70"
      >
        <Text className="text-white text-2xl">Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("TvShows")}
        className="p-2 border-b border-slate-400/70"
      >
        <Text className="text-white text-2xl">Tv Shows</Text>
      </TouchableOpacity>
    </View>
  );
}
