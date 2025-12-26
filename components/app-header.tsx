"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { ThemeToggle } from "@/components/theme-toggle"

export function AppHeader() {
  return (
    <div className="shadow-xl p-2 max-w-screen border-b-2 flex-none flex items-center justify-between">
      <span>Stadium Explorer</span>
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      <ThemeToggle/>
    </div>
  )
}