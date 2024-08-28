"use client";

import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Text,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Box,
  Image,
} from "@yamada-ui/react";
import { FC, useState } from "react";

const buttonsData = [
  {
    key: "list",
    value: "一覧",
  },
  {
    key: "category-filter",
    value: "カテゴリー・フィルター",
  },
];

export const Header: FC = () => {
  const [active, setActive] = useState<number | undefined>(undefined);
  const { isOpen: isopen, onOpen: onopen, onClose: onclose } = useDisclosure();

  return (
    <>
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
        <ButtonGroup isAttached>
          {buttonsData.map((button, index) => (
            <Button
              key={button.key}
              variant={active === index ? "solid" : "ghost"}
              bgColor={active === index ? "#F0F1D9" : undefined}
              _hover={{
                bgColor: "#F0F1D9",
              }}
              onClick={() => {
                setActive(active === index ? undefined : index);
                if (index === 0) {
                  onopen(); // "一覧"ボタンがクリックされたときにListドロワーを開く
                }
              }}
            >
              {button.value}
            </Button>
          ))}
        </ButtonGroup>
      </HStack>

      <Drawer
        isOpen={isopen}
        onClose={onclose}
        withOverlay={false}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0)", // DrawerBodyの背景を透明に設定
        }}
      >
        <DrawerHeader>一覧</DrawerHeader>
        <DrawerBody>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "100%" }}
          >
            <Box flex="1" textAlign="left">
              <Image
                src="/img/jyoukyouji.jpg"
                alt="淨教寺"
                boxSize="150px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" textAlign="right"></Box>
          </Box>
          <Box height="20px" bg="transparent" />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "100%" }}
          >
            <Box flex="1" textAlign="left">
              <Image
                src="/img/jyoukyouji.jpg"
                alt="Tera"
                boxSize="150px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" textAlign="right">
              <Text fontSize="lg">奈良の池です。</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "100%" }}
          >
            <Box flex="1" textAlign="left">
              <Image
                src="/img/jyoukyouji.jpg"
                alt="Tera"
                boxSize="150px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" textAlign="right">
              <Text fontSize="lg">奈良の神社です。</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "100%" }}
          >
            <Box flex="1" textAlign="left">
              <Image
                src="/img/jyoukyouji.jpg"
                alt="淨教寺"
                boxSize="150px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" textAlign="right">
              <Text fontSize="lg">奈良のお寺です。</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: "rgba(255, 255, 255, 1)", width: "100%" }}
          >
            <Box flex="1" textAlign="left">
              <Image
                src="/img/jyoukyouji.jpg"
                alt="淨教寺"
                boxSize="150"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" textAlign="right">
              <Text fontSize="lg">奈良のお寺です。</Text>
            </Box>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={onclose} alignItems="center">
            とじる
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};
