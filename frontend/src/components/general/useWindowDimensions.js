import {useState, useEffect} from 'react'

const getWindowDimensions = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return {
      windowWidth,
      windowHeight
    };
  }
  
  export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  
    useEffect(() => {
      let handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }
  
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, []);
  
    return windowDimensions;
  }