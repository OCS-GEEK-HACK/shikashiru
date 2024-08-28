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
  Image,
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
  const handlePlayAudio = async () => {
    const url = `/api/voicevox?text=${encodeURIComponent(name)}`;
    const audio = new Audio(url);
    audio.play();
    // console.log("音声を再生しました");

    // try {
    //   const response = await fetch(`/api/voicevox?text=${encodeURIComponent(name)}`);
    //   if (response.ok) {
    //     const audioUrl = await response.text();
    //     const audioInstance = new Audio(audioUrl);
    //     setAudio(audioInstance);
    //     audioInstance.play();
    //     console.log("音声を再生しました");

    //   } else {
    //     console.error("音声URLの取得に失敗しました");
    //   }
    // } catch (error) {
    //   console.error("エラーが発生しました:", error);
    // }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="7xl"
      fontFamily="FUTENE"
      size="lg"
      pt="md"
    >
      <ModalHeader></ModalHeader>

      <ModalBody>
        <Carousel slideSize="50%" autoplay delay={3000} dragFree h="sm">
          {images.map((image, index) => (
            <CarouselSlide key={index} as={Center} bg="primary">
              <Image
                src={image}
                alt={`${name} image ${index + 1}`}
                w="full"
                height="full"
                objectFit="cover"
              />
            </CarouselSlide>
          ))}
          <CarouselControlPrev />
          <CarouselControlNext />
          <CarouselIndicators />
        </Carousel>

        <HStack justifyContent="space-between" w="full">
          <Heading as="h2" size="2xl" fontFamily="FUTENE">
            {name}
          </Heading>
          <IconButton
            icon={<Volume2Icon />}
            colorScheme="teal"
            variant="outline"
            onClick={handlePlayAudio}
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
