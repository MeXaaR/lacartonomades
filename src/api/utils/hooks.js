import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useMapContext } from "../../context/mapContext";

export const handleInput = (callback) => (event) => {
  const { checked, value, name } = event.target;
  callback({ value, name });
};

export const useToggle = (initial = false) => {
  const [toggle, setToggle] = useState(initial);
  const toggleVariable = (value) => {
    setToggle((state) => (typeof value === "boolean" ? value : !state));
  };
  return [toggle, toggleVariable];
};

export const useLocalStorage = (key, initialValue, keys) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if(item){
        if(keys){
          return {
            ...JSON.parse(item),
            ...keys
          }
        } else {
          return JSON.parse(item)
        }
      }
      return initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

export const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
};

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function useQuery() {
  let queryString = useLocation().search;
  if (queryString[0] === "?") {
    const paramsStringArray = queryString.split("?")[1].split("&");
    const params = {};
    paramsStringArray.forEach((p) => {
      const keyValue = p.split("=");
      params[keyValue[0]] = keyValue[1];
    });
    params.center = Boolean(params.center);
    params.zoom = Number(params.zoom);
    return params;
  }
  return {};
}

export const useLocating = () => {
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const [{ locateMe, location, viewport }] = useMapContext();

  useEffect(() => {
    if ((locateMe === "trying" || !locateMe) && !locating) {
      setLocating(true);
      setLocated(false);
    } else if (locateMe === "success" && locating) {
      setLocated(true);
      setLocating(false);
    }
  }, [locateMe]);
  return {
    locating,
    located,
    isOnLocation:
      !!location &&
      viewport &&
      viewport.center &&
      viewport.center.lng === location.lng,
  };
};
