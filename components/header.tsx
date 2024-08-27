"use client";

import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@yamada-ui/react";
import { FC } from "react";

import { useFilter } from "@/contexts/filter-context";

const filterData = [
  {
    key: "temples",
    value: "寺院",
  },
  {
    key: "parks",
    value: "公園",
  },
  {
    key: "historical-sites",
    value: "歴史的遺跡",
  },
];

export const Header: FC = () => {
  const { selectedKey, setSelectedKey } = useFilter();
  return (
    <HStack
      w="full"
      as="header"
      justifyContent="space-between"
      background="headerAlpha.600"
      backdropBlur="10px"
      backdropFilter="auto"
      backdropSaturate="180%"
      boxShadow="sm"
      p="md"
      position="fixed"
      top={0}
      zIndex={1}
    >
      <Heading fontFamily="FUTENE" color="h1.500">
        シカシる
        <Text as="span" fontSize="md">
          なのだ。
        </Text>
      </Heading>
      <ButtonGroup gap="md" variant="link">
        <Button>一覧</Button>
        <Menu offset={[0, 28]}>
          <MenuButton as={Button}>フィルター</MenuButton>
          <MenuList
            background="headerAlpha.500"
            backdropBlur="10px"
            backdropFilter="auto"
            backdropSaturate="180%"
          >
            {filterData.map((data) => (
              <MenuItem
                key={data.key}
                justifyContent="center"
                borderColor="#CCCDB7"
                background={data.key === selectedKey ? "headerAlpha.600" : ""}
                onClick={() => {
                  setSelectedKey(data.key === selectedKey ? "" : data.key);
                }}
              >
                {data.value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </ButtonGroup>
    </HStack>
  );
};
