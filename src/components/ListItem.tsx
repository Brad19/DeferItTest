import React, { useState } from 'react';
import { Dimensions, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import bill_1 from '../assets/bill_1.png';
import bill_2 from '../assets/bill_2.png';
import Popup from './Popup';

export interface ListRenderItemProps {
  id: number;
  date: string;
  amount: string;
  status: string;
}

const processingText =
  'This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.';
const scheduledText =
  "This bill is scheduled to be paid and will be paid on the due date, you're in good hands!, etc.)";

const ListItem: ListRenderItem<ListRenderItemProps> = ({ item }) => {
  const [tapped, setTapped] = useState(false);
  const imageSource = Math.floor(Math.random() * 6 + 1) % 2 === 0 ? bill_1 : bill_2;
  const [selectedImage, setSelectedImage] = useState(imageSource);
  let popupMessage = '';

  if (item.status === 'processing') {
    popupMessage = processingText;
  } else if (item.status === 'scheduled') {
    popupMessage = scheduledText;
  }

  const zoomImage = (): void => {
    setSelectedImage(selectedImage);
    setTapped(!tapped);
  };

  return (
    <View style={styles.container} key={item.id}>
      {!tapped ? (
        <>
          <View style={styles.imageWrapper}>
            <TouchableOpacity accessibilityRole="button" onPress={zoomImage}>
              <Image source={selectedImage} style={styles.image} accessibilityIgnoresInvertColors />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <Text>
              <Text style={styles.label}>Date: </Text>
              {new Date(item.date).toDateString()}
            </Text>
            <Text>
              <Text style={styles.label}>Amount: </Text>
              {`$${parseFloat(item.amount).toFixed(2)}`}
            </Text>
            <View style={styles.statusText}>
              <Text>
                <Text style={styles.label}>Status: </Text>

                {item.status}
              </Text>
              {popupMessage ? <Popup message={popupMessage} status={item.status}/> : null}
            </View>
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal>
          <TouchableOpacity accessibilityRole="button" style={styles.close} onPress={(): void => setTapped(!tapped)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={(): void => setTapped(!tapped)}
            style={styles.bigImageWrapper}
          >
            <Image source={selectedImage} style={styles.bigImage} accessibilityIgnoresInvertColors />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  close: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    zIndex: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: Dimensions.get('window').width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  closeText: {
    textAlign: 'center',
    color: 'red',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  bigImage: {
    height: 600,
    aspectRatio: 0.8,
  },
  bigImageWrapper: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 0.8,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  imageIcon: {
    height: 15,
    width: 15,
    tintColor: 'blue',
  },
  imageWrapper: {
    flex: 0.3,
  },
  menuTrigger: {
    height: 15,
    width: 15,
    alignItems: 'center',
    marginLeft: 10,
    top: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  statusText: {
    flexDirection: 'row',
  },
});
