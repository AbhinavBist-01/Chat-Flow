import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Premium ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/10 blur-[130px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 flex justify-center px-4">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
