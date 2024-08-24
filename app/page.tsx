import { MapComponent } from "@/components/map";
import { MapProvider } from "@/components/map-provider";
import { Heading, HStack, SegmentedControl, SegmentedControlButton, VStack } from "@yamada-ui/react";

export default function Home() {
  return (
    <VStack w="full" h="100dvh" gap={0}>
      <HStack w="full" as="header" justifyContent="space-between" background="headerAlpha.600" backdropBlur="blur(10px)" backdropFilter="blur(10px)" backdropSaturate="saturate(180%)" boxShadow="sm" p="md" position="fixed" top={0} zIndex={1}>
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
