import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "../components/CarouselCardItem";
// import data from "../helpers/data";

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/')
          .then((response) => response.json())
          .then((json) => setPosts(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
  }

  useEffect(() => {
      setLoading(true);
      getPosts();
  }, []);

  return (
    <View>
      {isLoading ? <Text>Loading...</Text> :
      <><Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={posts}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true} />
        <Pagination
            dotsLength={posts.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true} /></>}
    </View>
  );
};

export default Home;