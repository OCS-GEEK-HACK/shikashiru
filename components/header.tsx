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

export const Header: FC = () => {
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
        <Menu>
          <MenuButton as={Button}>フィルター</MenuButton>
          <MenuList
            background="headerAlpha.500"
            backdropBlur="10px"
            backdropFilter="auto"
            backdropSaturate="180%"
          >
            <MenuItem justifyContent="center" borderColor="#CCCDB7">
              寺院
            </MenuItem>
            <MenuItem justifyContent="center" borderColor="#CCCDB7">
              公園
            </MenuItem>
            <MenuItem justifyContent="center" borderColor="#CCCDB7">
              歴史的遺跡
            </MenuItem>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </HStack>
  );
};
