import { HeroUIProviderIsland } from "./HeroUIProviderIsland";
import { Navbar } from "./navbar"; // existing component

// Wrapper so we can mount HeroUI context for this island
export default function NavbarIsland() {
  return (
    <HeroUIProviderIsland>
      <Navbar />
    </HeroUIProviderIsland>
  );
}
