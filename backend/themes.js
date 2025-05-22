
exports.generateRandomTheme = () => {
  const colors = ['#FF6347', '#1E90FF', '#32CD32', '#FFC107'];
  const fonts = ['Poppins', 'Inter', 'Roboto'];
  const layouts = ['grid-cols-2', 'flex-row', 'flex-col'];
  const animations = ['animate-fade', 'animate-zoom', 'animate-slide'];
  return {
    primaryColor: colors[Math.floor(Math.random() * colors.length)],
    font: fonts[Math.floor(Math.random() * fonts.length)],
    layoutType: layouts[Math.floor(Math.random() * layouts.length)],
    animation: animations[Math.floor(Math.random() * animations.length)]
  };
};