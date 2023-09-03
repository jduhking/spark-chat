import { useState } from "react";
import axios from 'axios';



export default function HomePage() {

  const[demoText, setDemoText] = useState('This is the home page man');
  const url = '/';

  const handlePress = async () => {
    try {
      const result = await axios.get(url);
      setDemoText(result.data);
      
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <h1>{demoText}</h1>
      <button/>
    </>
  )
}

