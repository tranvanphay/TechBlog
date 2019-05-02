import React, { Component } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

export default class Splash extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={require('../images/logo.png')}>
                </Image>
                <Text style={styles.title}>Welcome to Tech Blog</Text>
            </View>
        )
    }

}
const styles= StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32,53,72)',
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    title:{
        fontWeight:'bold',
        fontSize: 18,
        color:'white'
    },
    image:{
        alignItems:'center',
        marginVertical:10
    }
})