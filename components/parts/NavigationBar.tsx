"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

const products: { title: string; href: string; description: string }[] = [
  {
    title: "AI Resume Parser",
    href: "/",
    description:
      "Extract information from resumes and CVs to automate the recruitment process.",
  },
  {
    title: "Generate Objective Tests",
    href: "/",
    description:
      "Create objective tests for your students or employees in minutes from resume data.",
  },
  {
    title: "Github Profile Analyzer",
    href: "/",
    description:
      "Analyze Github profiles to understand the skills and contributions of developers.",
  },
  {
    title: "Project Analysis & Breakdown",
    href: "/",
    description:
      "Analyze projects to understand the technologies and tools used.",
  },
];

export default function CustomNavigationMenu() {
  return (
    <div className="flex items-center justify-between container mx-auto p-4">
      <div className="cursor-pointer p-3">
        <h3 className="text-xl">evaluate.ai</h3>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="h-6 w-6">evaluate.ai</div>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        sign up for free!
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      Analyze resumes, github projects, portfolios and achievements to rank
                      candidates.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Documentation">
                  Learn how to use our AI models and tools.
                </ListItem>
                <ListItem href="/pricing" title="Credits">
                  Understand how to configure our tools.
                </ListItem>
                <ListItem href="/docs/ranking-system" title="Ranking System">
                  Explore our ranking system.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">Our Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {products.map((product) => (
                  <ListItem
                    key={product.title}
                    title={product.title}
                    href={product.href}
                  >
                    {product.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-base">Pricing</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="text-base">Documentation</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Button variant="outline" className="mr-5 ml-5">
          Sign Up
        </Button>
        <Button className="font-semibold">Login</Button>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
