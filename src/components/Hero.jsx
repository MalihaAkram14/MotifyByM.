import videoSrc from '../assets/hero.mp4';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background Video */}
      <video
  className="absolute inset-0 w-full h-full object-cover"
  src={videoSrc} // helmet
  autoPlay
  loop
  muted
  playsInline
></video>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
        
        {/* Title */}
        <h1 className="text-white font-bold text-5xl md:text-7xl tracking-wide uppercase drop-shadow-2xl animate-fade-in">
          Elevate Your Shopping
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-white/80 text-lg md:text-xl max-w-xl animate-fade-in delay-200">
          Discover premium collections, exclusive deals, and a seamless shopping experience.
        </p>

        {/* Button */}
        <a 
          href="/products"
          className="mt-10 px-8 py-3 border border-white/50 text-white uppercase tracking-wide 
                     hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
        >
          Explore Collection
        </a>
      </div>
    </div>
  );
};

export default Hero;
