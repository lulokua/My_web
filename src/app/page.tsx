export default function Home() {
  return (
    <div 
      className="flex h-[calc(100vh-84px)] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://my-blog.cn-nb1.rains3.com/My_web/index.png')" }}
    >
      <h1 className="flex items-center gap-1 md:gap-8 font-anthropic text-6xl md:text-8xl text-white tracking-widest drop-shadow-2xl">
        <span>Born to</span>
        <span>Explore.</span>
      </h1>
    </div>
  );
}
