import { HeroUIProviderIsland } from "./HeroUIProviderIsland";
import { ThemeSwitch } from "./theme-switch";

// Wrapper to provide HeroUI context (theme) to the switch
export function ThemeSwitchIsland(props: any) {
  return (
    <HeroUIProviderIsland>
      <ThemeSwitch {...props} />
    </HeroUIProviderIsland>
  );
}
