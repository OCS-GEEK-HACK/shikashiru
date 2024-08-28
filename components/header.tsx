"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Text,
  useAsync,
  VStack,
} from "@yamada-ui/react";
import { FC, useRef, useState } from "react";

import mapData from "@/components/map-data.json";
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
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  useAsync(async () => {
    if (headerRef.current) {
      // ヘッダーの高さを取得
      const height = headerRef.current.getBoundingClientRect().height;
      setHeaderHeight(height);
    }
  });

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
      ref={headerRef}
    >
      <Heading fontFamily="FUTENE" color="h1.500" userSelect="none">
        シカシる
        <Text as="span" fontSize="md">
          なのだ。
        </Text>
      </Heading>
      <ButtonGroup gap="md" variant="link">
        <Popover animation="right" closeOnButton={false} offset={[0, 28]}>
          <PopoverTrigger>
            <Button>一覧</Button>
          </PopoverTrigger>
          <PopoverContent
            background="whiteAlpha.100"
            boxShadow="none"
            border="none"
          >
            <PopoverBody
              gap="md"
              as={ScrollArea}
              h={`calc(100dvh - ${headerHeight}px)`}
              m={0}
              py="md"
            >
              {mapData.map((data) => (
                <Card key={data.name} bgColor="white" w="full">
                  <CardBody flexDir="row">
                    <Box boxSize="4xs">
                      <Image
                        w="full"
                        h="full"
                        objectFit="cover"
                        src={data.images[0]}
                      />
                    </Box>
                    <VStack w="md">
                      <Text>{data.name}</Text>
                      <Text isTruncated>{data.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
