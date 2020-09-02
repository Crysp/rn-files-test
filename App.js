/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const fn = async () => {
    const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
    });

    console.log(file);

    const res = await RNFetchBlob.fetch('POST', 'https://google.com', {}, [
        {
            name: 'file',
            filename: file.name,
            data: RNFetchBlob.wrap(decodeURI(file.uri)),
        },
    ]);

    console.log(res);
};

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={{padding: 20}}>
                        <TouchableOpacity onPress={async () => {
                            const res = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
                            console.log(res);
                        }}>
                            <View style={{padding: 10, backgroundColor: 'orange', borderRadius: 5}}>
                                <Text style={{color: 'white'}}>Permission</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 20}}>
                        <TouchableOpacity onPress={fn}>
                            <View style={{padding: 10, backgroundColor: 'green', borderRadius: 5}}>
                                <Text style={{color: 'white'}}>Select</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
