"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";

if (typeof window !== "undefined") {
  posthog.init("phc_hdi6mvjBwO3cskkS1SFZLHPn9ntGi4VZrZempg76Jk7", {
    api_host: "https://eu.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

interface Props {
  children: ReactNode;
}

export function CSPostHogProvider({ children }: Props) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
