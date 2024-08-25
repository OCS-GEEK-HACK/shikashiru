"use client";
import { Volume2Icon } from "@yamada-ui/lucide";
import {
  Button,
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
  onNavigate,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader></ModalHeader>

      <ModalBody py="md">
        {/* カルーセルを置く */}
        <HStack justifyContent="space-between" w="full">
          <Heading as="h2" size="md">
            {name}
          </Heading>
          <IconButton
            icon={<Volume2Icon />}
            colorScheme="teal"
            variant="outline"
          />
        </HStack>
        <Text>{description}</Text>
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
