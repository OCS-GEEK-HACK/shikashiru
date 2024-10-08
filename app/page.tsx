import { VStack } from "@yamada-ui/react";

import { Header } from "@/components/header";
import { MapComponent } from "@/components/map";
import { MapProvider } from "@/components/map-provider";

export default function Home() {
  return (
    <VStack w="full" h="100dvh" gap={0}>
      <Header />
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </VStack>
  );
}
