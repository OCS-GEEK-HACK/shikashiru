"use client";

import { Button, ButtonGroup, Heading, HStack, Text } from "@yamada-ui/react";
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
      <ButtonGroup isAttached>
        {buttonsData.map((button, index) => (
          <Button
            key={button.key}
            variant={active === index ? "solid" : "ghost"}
            onClick={() => {
              setActive(active === index ? undefined : index);
            }}
          >
            {button.value}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
