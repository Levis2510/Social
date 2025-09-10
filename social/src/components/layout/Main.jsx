export default function Main({ children }) {
  return (
    <main
      className=" flex-1 transition-all duration-300 md:ml-16 group-hover:ml-64 p-6 "
    >
      {children}
    </main>
  );
}
