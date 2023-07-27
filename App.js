import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import * as LocalAuthentification from 'expo-local-authentication'



export default function App() {

  {/*
      const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(()=> {
    async function authenticate() {
      const result = await LocalAuthentification.authenticateAsync();
      setIsAuthenticated(result.success)
    }
    authenticate();
    
  }, []);
  */}
  

  
  const addItem = async () => {
    try {
      const iscompatible = await LocalAuthentification.authenticateAsync();
      if(iscompatible.success){
        handleAddTask()
        Alert.alert('successfully added')
      }
      
    } 
    catch(error){
      Alert.alert('wrong credentials')
    }
  }

  const isAuthenticated = async () => {
    try {
      const iscompatible = await LocalAuthentification.authenticateAsync();
      if(iscompatible.success){
        Alert.alert('updated')
      }
      
    } 
    catch(error){
      Alert.alert('wrong credentials')
    }
  }

  const deleteItem = async (index) => {
    try {
      const iscompatible = await LocalAuthentification.authenticateAsync();
      if(iscompatible.success){
        completeTask(index)
        Alert.alert('deleted')
      }
      
    } 
    catch(error){
      Alert.alert('wrong credentials')
    }
  }
  
  const updateItem =  (index,text) => {
    updateTask(index, text)
  }

  const updateTask =  (index, text) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = text
    setTaskItems(itemsCopy)
  }


  const [task, setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);
  
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
   
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy)

  }


  
  return (
    <View style={styles.container}>

      {/* today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {/* this is where the tasks will apear! */}

          {
            taskItems.map((item, index) => {
{/*onPress={() => deleteItem(index)}*/}
              return(
                <TouchableOpacity key={index} >
                  <Task  text={item} deleteItem={deleteItem}  updateItem={updateItem} isAuthenticated={isAuthenticated} index={index}/>
                </TouchableOpacity>
              ) 
            })
          }
          
       
        </View>

      </View>

    {/* write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
          <TextInput
           style={styles.input}
           placeholder={'Write a task'} 
           
           onChangeText={text => setTask(text) }
           value={task} 
           />

          <TouchableOpacity onPress={() => addItem()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 700
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {}
});