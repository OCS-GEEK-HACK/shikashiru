"use client";
import { GoogleMap } from "@react-google-maps/api";
import React, {
  createContext,
  useContext,
  useRef,
  FC,
  RefObject,
  ReactNode,
} from "react";

interface GoogleMapRefContextType {
  mapRef: RefObject<GoogleMap>;
}

const GoogleMapRefContext = createContext<GoogleMapRefContextType | undefined>(
  undefined,
);

export const useGoogleMapRef = () => {
  const context = useContext(GoogleMapRefContext);
  if (!context) {
    throw new Error(
      "useGoogleMapRef must be used within a GoogleMapRefProvider",
    );
  }
  return context;
};

export const GoogleMapRefProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mapRef = useRef<GoogleMap>(null);

  return (
    <GoogleMapRefContext.Provider value={{ mapRef }}>
      {children}
    </GoogleMapRefContext.Provider>
  );
};
