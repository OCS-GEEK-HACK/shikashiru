"use client";
import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";

// フィルター選択状態の型
interface FilterContextType {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

// Contextの作成
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Context Providerコンポーネント
export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState<string>("");

  return (
    <FilterContext.Provider value={{ selectedKey, setSelectedKey }}>
      {children}
    </FilterContext.Provider>
  );
};

// useContextで使うためのカスタムフック
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
