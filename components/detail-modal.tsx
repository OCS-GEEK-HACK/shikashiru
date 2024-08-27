"use client";

import {
  Carousel,
  CarouselSlide,
  CarouselControlNext,
  CarouselControlPrev,
  CarouselIndicators,
} from "@yamada-ui/carousel";
import { Volume2Icon } from "@yamada-ui/lucide";
import {
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@yamada-ui/react";
import { FC } from "react";

interface DetailModalProps {
  isOpen: boolean;
  name: string;
  description: string;
  images: string[];
  onClose: () => void;
  onNavigate: () => void;
}

export const DetailModal: FC<DetailModalProps> = ({
  isOpen,
  name,
  description,
  images,
  onNavigate,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1200px"
      fontFamily="FUTENE"
      size="lg"
    >
      <ModalHeader></ModalHeader>

      <ModalBody py="md">
        {/* カルーセル */}
        <Carousel slideSize="50%" autoplay delay={3000} dragFree>
          {images.map((image, index) => (
            <CarouselSlide
              key={index}
              as={Center}
              bg="primary"
              style={{
                height: "300px",
              }}
            >
              <img
                src={image}
                alt={`${name} image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </CarouselSlide>
          ))}
          <CarouselControlPrev
            style={{
              position: "absolute",
              top: "40%",
            }}
          />
          <CarouselControlNext
            style={{
              position: "absolute",
              top: "40%",
            }}
          />
          <CarouselIndicators />
        </Carousel>

        <HStack justifyContent="space-between" w="full">
          <Heading as="h2" size="2xl" fontFamily={"FUTENE"}>
            {name}
          </Heading>
          <IconButton
            icon={<Volume2Icon />}
            colorScheme="teal"
            variant="outline"
          />
        </HStack>
        <Text fontSize="xl" mt="2">
          {description}
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          とじる
        </Button>
        <Button colorScheme="teal" onClick={onNavigate}>
          道案内
        </Button>
      </ModalFooter>
    </Modal>
  );
};
