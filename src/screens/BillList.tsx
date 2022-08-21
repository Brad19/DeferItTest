import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import ListItem, { ListRenderItemProps} from '../components/ListItem';

const BillList = (): ReactElement => {
  const [billList, setBillList] = useState([]);
  const [loadList, setLoadList] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(10);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getBillList = async () => {
      try {
        const response = await axios.get('https://62fe254341165d66bfb96933.mockapi.io/api/v1/bills/list');
        setBillList(response.data);

        return;
      } catch (e) {
        console.log('e :', e);
        setBillList([]);
      }
    };

    getBillList();
  }, []);

  useEffect(() => {
    const loadGroup = billList?.length > 0 ? billList.slice(0, selectedGroupId) : [];
    const groupOfTen = loadGroup.length ? Array(1).fill(loadGroup)[0] : [];

    setLoadList(groupOfTen);
  }, [billList, selectedGroupId]);

  return (
    <>
      {loadList?.length > 0 ?
        <FlatList
        data={loadList}
        contentContainerStyle={{ flexGrow: 1, bottom: 20 }}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={() => <View style={{paddingTop: 20}}/>}
        renderItem={(props) => <ListItem {...props} />}
        keyExtractor={(item : ListRenderItemProps ) => 'item_' + item.id}
        onEndReached={() => {
          setSelectedGroupId(selectedGroupId + 10);
        }}
        accessibilityLabel="billList"
      />
      : 
      <View style={styles.activityIndicator}>
        <ActivityIndicator size={"small"} />
      </View>  
      }
      
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  itemSeparator: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

export default BillList;
