import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // You can choose another icon set if you prefer

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://bloggler-backend.vercel.app/api/post");
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ａｌｌ Ｐｏｓｔｓ</Text>
      {posts.map((post) => (
        <View key={post._id} style={styles.card}>
          {post.createdBy.imageUrl ? (
            <Image source={{ uri: post.createdBy.imageUrl }} style={styles.image} />
          ) : (
            <Icon name="user" size={60} color="#fff" style={styles.defaultUserIcon} />
          )}
          <View style={styles.content}>
            <Text style={[styles.title, { fontSize: 18, color: "#2c3e50" }]}>{post.title}</Text>
            <Text style={{ fontSize: 16, color: "#34495e" }}>{post.content}</Text>
            <Text style={{ fontSize: 14, color: "#7f8c8d" }}>Created by: {post.createdBy.userName}</Text>
          </View>
          <View style={styles.buttonColumn}>
            <TouchableOpacity style={[styles.button, { borderColor: "#fff" }]}>
              <Icon name="thumbs-up" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderColor: "#fff" }]}>
              <Icon name="thumbs-down" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderColor: "#fff" }]}>
              <Icon name="comment" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderColor: "#fff" }]}>
              <Icon name="share" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#ecf0f1",
    height :'100vh'
  },
  card: {
    backgroundColor: "#afdcec",
    marginBottom: 20,
    padding: 10,
    width: "65%",
    height: '3%', 
    margin: "0 auto",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 15,
    elevation: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    marginRight: 10,
  },
  defaultUserIcon: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    marginRight: "1%",
    marginLeft: "1%",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  buttonColumn: {
    marginTop: '8%',
    marginRight: '2%', 
    display: 'flex',
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3bacec",
  },
});
