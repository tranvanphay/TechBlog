import React, { Component } from 'react';
import { StyleSheet, View , Text, TouchableOpacity, Platform, Image, TextInput} from 'react-native';
import PopupDialog , {SlideAnimation, DialogTitle} from 'react-native-popup-dialog';

import {updateTodoList} from '../database/allSchemas'

export default class PopupDialogComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            id:0,
            name:''
        };
    }
    showDialogComponentForUpdate = (existingTodoList) => {
        this.refs.popupDialog.show();
        this.setState({
                dialogTitle:'Update a Post',
                id:existingTodoList.id,
                name: existingTodoList.name,
        });
    }

    render(){
        const{dialogTitle} = this.state;
        return(
            <PopupDialog 
                    
                    dialogTitle={<DialogTitle title={dialogTitle}/>}
                    width={0.7} height={100}
                    ref={'popupDialog'}
                   
                    >
                <View style={styles.container}>
                <TextInput style={styles.textInput} placeholder='Enter your post' autoCorrect={false}
                onChangeText={(text) => this.setState[{name: text}]} value={this.state.name}/>
                
                <TouchableOpacity style={styles.button} onPress={() => {
                    if(this.state.name.trim() == ''){
                        alert('Please enter your Post');
                        return;
                    }
                    this.refs.popupDialog.dismiss(() => {
                        const todoList = {
                            id: this.state.id,
                            name: this.state.name,
                        };
                        updateTodoList(todoList).then().catch((error) => {
                            alert('Update todoList error');
                        });
                    });
                }}>
            
                    <Text style={styles.textLabel}>Save</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.refs.popupDialog.dismiss(() =>{
                        console.log('call cancel')
                    });
                }}>
                    <Text style={styles.textLabel}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                </View>
            </PopupDialog>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flexDirection:"column",
        justifyContent:'center',
        alignItems: 'center',
    },
    textInput:{
        height:40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    button:{
        backgroundColor:'steelblue',
        padding:10,
        margin:10,
    },
    textLabel:{
        color: 'white',
        fontSize: 18,
    }
})