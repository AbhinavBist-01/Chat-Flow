import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      forceRedirectUrl={"/"}
      appearance={{
        variables: {
          colorPrimary: "#ffffff",
          colorBackground: "#09090b", // zinc-950
          colorInput: "#18181b", // zinc-900
          colorForeground: "#f4f4f5", // zinc-100
          colorMutedForeground: "#a1a1aa", // zinc-400
          colorInputForeground: "#f4f4f5",
          colorNeutral: "#27272a", // zinc-800
          colorSuccess: "#10b981",
          colorWarning: "#f59e0b",
          colorDanger: "#ef4444",
        },
        elements: {
          card: "bg-zinc-950 border border-zinc-800 shadow-2xl rounded-2xl",
          headerTitle: "text-zinc-50 font-bold",
          headerSubtitle: "text-zinc-400",
          socialButtonsBlockButton: "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 transition-all text-zinc-100 font-medium",
          socialButtonsBlockButtonText: "text-zinc-100",
          formButtonPrimary: "bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-medium transition-all",
          formFieldLabel: "text-zinc-300 font-medium",
          formFieldInput: "bg-zinc-900 border border-zinc-800 focus:border-zinc-700 focus:ring-zinc-700 text-zinc-50 rounded-xl",
          footerActionText: "text-zinc-400",
          footerActionLink: "text-zinc-50 hover:text-zinc-200 font-semibold",
          dividerLine: "bg-zinc-800",
          dividerText: "text-zinc-500",
        }
      }}
    />
  );
}
