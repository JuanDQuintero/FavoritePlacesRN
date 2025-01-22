import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
    if (!places || places.length === 0) {
        return <View style={styles.fallBackContainer}>
            <Text style={styles.fallBackText}>No places added yet - start adding some!</Text>
        </View>
    }
    return <FlatList
        style={styles.list}
        data={places}
        renderItem={({ item }) => <PlaceItem place={item} />}
        keyExtractor={(item) => item.id} />;
}

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallBackText: {
        fontSize: 16,
        color: Colors.primary200
    }
});
