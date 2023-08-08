import React from "react";
import {View, Text, StyleSheet, TouchableOpacity,TextInput} from 'react-native'


const Task = (props) => {

   

   
      
    return (
        <View style={styles.item}>

            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <TextInput
                      style={styles.itemText}
                      onChangeText={text => props.updateItem(props.index,text) }
                      value={props.text} 
                    />
            </View>
          
            <View>

            <TouchableOpacity style={styles.delete}  onPress={() => props.deleteItem(props.index)}>
                 <Text style={styles.deleteIcon} >×</Text>
            </TouchableOpacity>
               
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection:  'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 25,
        height: 25,
        backgroundColor: "#1A962A",
        opacity: 0.4,
        marginRight: 15
    },
    itemText: {
        width: '80%',
        height: '100%',
        paddingVertical: 15  
    },
    delete: {
        
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
       
    },
    deleteIcon: {
        fontSize: 14,
        fontWeight: 700,
        color: '#D11A2A',
    }

});

export default Task;