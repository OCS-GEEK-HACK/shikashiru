import { MapComponent } from "@/components/map";
import { MapProvider } from "@/components/map-provider";
import { Heading, HStack, SegmentedControl, SegmentedControlButton, VStack } from "@yamada-ui/react";

export default function Home() {
  return (
    <VStack w="full" h="100dvh" gap={0}>
      <HStack as="header" justifyContent="space-between" bgColor="#C8CC86" opacity={0.49} p="md" position="sticky" top={0}>
        <Heading>シカシるなのだ。</Heading>
        <SegmentedControl>
          <SegmentedControlButton value="list">一覧</SegmentedControlButton>
          <SegmentedControlButton value="category-filter">カテゴリー・フィルター</SegmentedControlButton>
        </SegmentedControl>
      </HStack>
      <MapProvider>
        <MapComponent/>
      </MapProvider>
    </VStack>
  );
}
