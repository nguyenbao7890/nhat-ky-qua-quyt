const ANIMALS = [
  'Cá voi', 'Cà Mập', 'Bạch Tuộc', 'Rùa biển', 
  'Chim Cánh Cụt', 'Gấu Bắc Cực', 'Hải Cẩu', 'Vịt Con', 
  'Mèo Nhỏ', 'Cáo Cam', 'Gấu Trúc', 'Sóc Nhỏ', 'Thỏ Trắng'
];

const COLORS = [
  'Xanh', 'Trắng', 'Màu Cam', 'Cầu Vồng', 'Ánh Sao', 
  'Hồng Phấn', 'Xám Bạc', 'Vàng Chanh', 'Xanh Lá'
];

const AVATARS = [
  '🐳', '🦈', '🐙', '🐢', 
  '🐧', '🐻', '🦆', 
  '🐱', '🦊', '🐼', '🐿️', '🐰'
];

export function getRandomIdentity() {
  const animalIdx = Math.floor(Math.random() * ANIMALS.length);
  const colorIdx = Math.floor(Math.random() * COLORS.length);
  
  return {
    name: `${ANIMALS[animalIdx]} ${COLORS[colorIdx]}`,
    avatar: AVATARS[animalIdx]
  };
}
